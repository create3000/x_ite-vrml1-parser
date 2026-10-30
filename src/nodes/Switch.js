import BaseNode from "./BaseNode.js";

export default class Switch extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("whichChild", new X3D .Fields .SFInt32 (-1));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create Transform node.

      const
         transformNode = converter .scene .createNode ("Transform"),
         switchNode    = converter .scene .createNode ("Switch");

      // Set values.

      transformNode .children .push (switchNode);

      switchNode .whichChoice = this .fields .get ("whichChild");

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
      converter .groups     .push (switchNode);

      for (const node of this .fields .get ("children"))
         node .convert (converter);

      converter .restore ();
   }
};
