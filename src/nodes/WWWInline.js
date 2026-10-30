import BaseNode from "./BaseNode.js";

export default class WWWInline extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("name",       new X3D .Fields .MFString ());
      this .fields .set ("bboxSize",   new X3D .Fields .SFVec3f (-1, -1, -1));
      this .fields .set ("bboxCenter", new X3D .Fields .SFVec3f ());
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const inlineNode = converter .scene .createNode ("Inline");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, inlineNode);

      // Assign values.

      inlineNode .url = this .fields .get ("name");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (inlineNode);
      else
         converter .scene .rootNodes .push (inlineNode);
   }
};
