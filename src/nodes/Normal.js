import BaseNode from "./BaseNode.js";

export default class Normal extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("vector", new X3D .Fields .MFVec3f ());
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         converter .normals .push (converter .scene .getNamedNode (this .name));

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

      const normalNode = converter .scene .createNode ("Normal");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, normalNode);

      // Assign values.

      normalNode .vector = this .fields .get ("vector");

      converter .normals .push (normalNode);
   }
};
