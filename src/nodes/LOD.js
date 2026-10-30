import BaseNode from "./BaseNode.js";

export default class LOD extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("range",  new X3D .Fields .MFFloat (-1));
      this .fields .set ("center", new X3D .Fields .SFVec3f ());
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create Transform node.

      const
         transformNode = converter .scene .createNode ("Transform>"),
         lodNode       = converter .scene .createNode ("Switch");

      // Set values.

      transformNode .children () .push (lodNode);

      lodNode .range  = this .fields .get ("range");
      lodNode .center = this .fields .get ("center");

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
      converter .groups     .push (lodNode);

      for (const node of this .fields .get ("children"))
         node .convert (converter);

      converter .restore ();
   }
};
