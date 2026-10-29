import register    from "../node_modules/x_ite-extension/dist/x_ite-extension.js";
import Coordinate3 from "./nodes/Coordinate3.js";
import CustomNode  from "./nodes/CustomNode.js";
import Material    from "./nodes/Material.js";
import Separator   from "./nodes/Separator.js";
import ShapeHints  from "./nodes/ShapeHints.js";

register (X3D =>
{
/*
*  Grammar
*/

// VRML lexical elements
const Grammar = X3D .Expressions ({
   // General
   Whitespaces: /[\x20\n,\t\r]+/y,
   Comment:     /#\/\*.*?\*\/#|#[^\r\n]*(?=[\r\n]|$)/sy,
   LineFeed:    /\n/g,

   // Keywords
   DEF:    /DEF/y,
   fields: /fields/y,
   NULL:   /NULL/y,
   USE:    /USE/y,

   // Terminal symbols
   OpenBrace:    /\{/y,
   CloseBrace:   /\}/y,
   OpenBracket:  /\[/y,
   CloseBracket: /\]/y,
   Period:       /\./y,
   Colon:        /:/y,
   VerticalBar:  /\|/y,

   // eslint-disable-next-line no-control-regex
   Id: /[^\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f]{1}[^\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f]*/y,
   // eslint-disable-next-line no-control-regex
   ComponentNameId: /[^\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f\x3a]{1}[^\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f\x3a]*/y,

   // Values
   int32: /(?:0[xX][\da-fA-F]+)|(?:[+-]?\d+)/y,
   double: /(?!0[xX])[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/y,
});

return class VRML1Parser extends X3D .X3DParser
{
   static {
      X3D .GoldenGate .addParsers (this);
   }

   nodes = new Map ([
      ["Coordinate3", Coordinate3],
      ["Material",    Material],
      ["Separator",   Separator],
      ["ShapeHints",  ShapeHints],
   ]);

   substitutions = new Map ([
      ["SFBitMask", "SFString"],
      ["SFEnum",    "SFString"],
      ["SFLong",    "SFInt32"],
      ["SFMatrix",  "SFMatrix4f"],
      ["MFBitMask", "MFString"],
      ["MFEnum",    "MFString"],
      ["MFLong",    "MFInt32"],
      ["MFMatrix",  "MFMatrix4f"],
   ]);

   getEncoding ()
   {
      return "STRING";
   }

   setInput (input)
   {
      this .input      = input;
      this .lineNumber = 0;
      this .lastIndex  = 0;
   }

   isValid ()
   {
      return this .input .match (/^#VRML V1.0/);
   }

   parseIntoScene (resolve, reject)
   {
      this .parser     = new X3D .VRMLParser (this .getScene ());
      this .namedNodes = new Map ();
      this .rootNodes  = [ ];

      this .parser [X3D .X3DConstants .SFNode]   = this [X3D .X3DConstants .SFNode];
      this .parser [X3D .X3DConstants .SFString] = this [X3D .X3DConstants .SFString];

      this .parser .pushExecutionContext (this .getScene ());
      this .parser .setInput (this .input);

      this .vrml1 ()
         .then (resolve)
         .catch (reject);
   }

   async vrml1 ()
   {
      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      scene .setEncoding ("VRML");
      scene .setProfile (browser .getProfile ("Interchange"));

      await this .loadComponents ();

      this .vrmlScene ();

      return scene;
   }

   vrmlScene ()
   {
      this .statements ();
   }

   comments ()
   {
      while (this .comment ())
         ;
   }

   comment ()
   {
      if (this .whitespaces ())
         return true;

      return Grammar .Comment .parse (this);
   }

   whitespaces ()
   {
      if (Grammar .Whitespaces .parse (this))
      {
         this .lines (this .result [0]);

         return true;
      }

      return false;
   }

   lines (string)
   {
      const match = string .match (Grammar .LineFeed);

      if (match)
         this .lineNumber += match .length;
   }

   statements ()
   {
      while (this .statement ())
		   ;
   }

   statement ()
   {
      const node = this .nodeStatement ();

      if (node)
      {
         this .rootNodes .push (node);
         return true;
      }

      return false;
   }

   nodeStatement ()
   {
      this .comments ();

      if (Grammar .DEF .parse (this))
      {
         if (this .Id ())
            return this .node (this .result [0]);

         throw new Error ("No name given after DEF.");
      }

      if (Grammar .USE .parse (this))
      {
         if (this .Id ())
         {
            const nodeNameId = this .result [0];

            return this .namedNodes .get (nodeNameId);
         }

         throw new Error ("No name given after USE.");
      }

      if (Grammar .NULL .parse (this))
         return null;

      return this .node ("");
   }

   node (nodeNameId)
   {
      const { lastIndex, lineNumber } = this;

      if (this .Id ())
      {
         const nodeTypeId = this .result [0];

         console .log (nodeTypeId);

         this .comments ();

         if (Grammar .OpenBrace .parse (this))
         {
            const
               nodeType = this .nodes .get (nodeTypeId),
               node     = new (nodeType ?? CustomNode) (X3D, this .getScene (), nodeTypeId, nodeNameId);

            if (!nodeType)
               this .fieldElements (node);

            this .nodeBody (node);

            this .comments ();

            if (Grammar .CloseBrace .parse (this))
               return true;

			   throw new Error ("Expected '}' at the end of node body.");
         }

         this .lastIndex  = lastIndex;
         this .lineNumber = lineNumber;

         return false;
      }

      return false;
   }

   nodeBody (node)
   {
      console .log (node);

      while (this .nodeBodyElement (node))
		   ;
   }

   nodeBodyElement (node)
   {
      const child = this .nodeStatement ();

      if (child)
      {
         node .fields .get ("children") .push (child);
         return true;
      }

      if (this .Id ())
      {
         const
            fieldId = this .result [0],
            field   = node .fields .get (fieldId);

         if (!field)
            throw new Error (`Unknown field '${fieldId}' in class '${node .typeName}'.`);

         if (field .isInitializable ())
         {
            if (this .fieldValue (field))
               return true;

            throw new Error (`Couldn't read value for field '${fieldId}'.`);
         }

         throw new Error (`Couldn't assign value to field '${fieldId}'.`);
      }

      return false;
   }

   fieldElements (node)
   {
      this .comments ();

      if (Grammar .fields .parse (this))
      {
         this .comments ();

         if (Grammar .OpenBracket .parse (this))
         {
            while (this .fieldElement (node))
               ;

            if (Grammar .CloseBracket .parse (this))
               return;
         }

         throw new Error ("Couldn't parse custom fields.");
      }
   }

   fieldElement (node)
   {
	   this .comments ();

      if (this .Id ())
      {
         const fieldType = this .substitutions .get (this .result [0])
            ?? this .result [0];

         this .comments ();

         if (this .Id ())
         {
            const
               fieldName = this .result [0],
               field     = new (this .getBrowser () .getSupportedField (fieldType)) ();

            node .fields .set (fieldName, field);

            return true;
         }
      }

      return false;
   }

   fieldValue (field)
   {
      this .parser .lineNumber = this .lineNumber;
      this .parser .lastIndex  = this .lastIndex;

      const result = this .parser [field .getType ()] (field, field .getUnit ());

      this .lineNumber = this .parser .lineNumber;
      this .lastIndex  = this .parser .lastIndex;

      return result;
   }

   Id ()
   {
      this .comments ();

      return Grammar .Id .parse (this);
   }

   [X3D .X3DConstants .SFNode] ()
   {
      return false;
   }

   [X3D .X3DConstants .SFString] (field)
   {
      if (X3D .VRMLParser .prototype .sfstringValue (this .parser, field))
         return true;

      // Parse SFEnum and SFBitMask

      field .setValue ("");

      this .comments ();

      while (this .Id ())
      {
         field .setValue (field .getValue () + this .result [0]);

         this .comments ();

         if (Grammar .VerticalBar .parse (this))
         {
            field .setValue (field .getValue () + "|");

            this .comments ();
            continue;
         }

         return true;
      }

      return false;
   }
};
});
