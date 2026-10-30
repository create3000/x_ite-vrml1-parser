import BaseNode from "./BaseNode.js";

export default class WWWAnchor extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("name",        new X3D .Fields .MFString ());
      this .fields .set ("description", new X3D .Fields .SFString (""));
      this .fields .set ("map",         new X3D .Fields .SFString ("NONE"));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create Transform node.

      const
         transformNode = converter .scene .createNode ("Transform"),
         anchorNode    = converter .scene .createNode ("Anchor");

      // Set values.

      transformNode .children .push (anchorNode);

      anchorNode .url         = this .fields .get ("name");
      anchorNode .description = this .fields .get ("description");

      // Add root node if needed or add as child.

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (transformNode);
      else
         converter .scene .rootNodes .push (transformNode);

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, transformNode);

      // Convert children.

      converter .save ();
      converter .transforms .push (transformNode);
      converter .groups     .push (anchorNode);

      for (const node of this .fields .get ("children"))
         node .convert (converter);

      converter .restore ();
   }
};
