import BaseNode from "./BaseNode.js";

export default class TextureCoordinate2 extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("point", new X3D .Fields .MFVec2f (new X3D .Fields .SFVec2f ()));
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         converter .texCoords .push (converter .scene .getNamedNode (this .name));

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

      const texCoordNode = converter .scene .createNode ("TextureCoordinate");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, texCoordNode);

      // Assign values.

      texCoordNode .point = this .fields .get ("point");

      converter .texCoords .push (texCoordNode);
   }
};
