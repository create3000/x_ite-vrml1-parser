import register   from "../node_modules/x_ite-extension/dist/x_ite-extension.js";
import Separator  from "./nodes/Separator.js";
import CustomNode from "./nodes/CustomNode.js";

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
   DEF:  /DEF/y,
   NULL: /NULL/y,
   USE:  /USE/y,

   // Terminal symbols
   OpenBrace:    /\{/y,
   CloseBrace:   /\}/y,
   OpenBracket:  /\[/y,
   CloseBracket: /\]/y,
   Period:       /\./y,
   Colon:        /:/y,

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
      ["Separator", Separator],
   ]);

   constructor (scene)
   {
      super (scene);

      this .namedNodes = new Map ();
      this .rootNodes  = [ ];
   }

   getEncoding ()
   {
      return "STRING";
   }

   setInput (input)
   {
      this .input = input;
   }

   isValid ()
   {
      return this .input .match (/^#VRML V1.0/);
   }

   parseIntoScene (resolve, reject)
   {
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
      console .log (nodeNameId);

      if (this .Id ())
      {
         const nodeTypeId = this .result [0];

         console .log (nodeTypeId);

         this .comments ();

         if (Grammar .OpenBrace .parse (this))
         {
            const nodeType = this .nodes .get (nodeTypeId);

            const node = nodeType
               ? new nodeType (X3D, this .getScene (), nodeNameId)
               : new CustomNode (X3D, this .getScene ());

            this .nodeBody (node);

            this .comments ();

            return Grammar .CloseBrace .parse (this);
         }
      }

      return false;
   }

   nodeBody (node)
   {
      console .log (node);
   }

   Id ()
   {
      this .comments ();

      return Grammar .Id .parse (this);
   }
};
});
