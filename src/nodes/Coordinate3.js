import BaseNode from "./BaseNode.js";

export default class Coordinate3 extends BaseNode
{
   constructor (X3D, name)
   {
      super (X3D, "Coordinate3", name);

      this .fields .set ("point", new X3D .Fields .MFVec3f ());
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         converter .coords .push (converter .scene .getNamedNode (this .name));

         return true;
      }
      catch
      {
         return false;
      }
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const coordNode = converter .scene .createNode("Coordinate");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, coordNode);

      // Assign values.

      coordNode .point = this .fields .get ("point");

      converter .coords .push (coordNode);
   }
};
