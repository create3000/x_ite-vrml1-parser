import BaseNode from "./BaseNode.js";

export default class Texture2Transform extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("translation", new X3D .Fields .SFVec2f ());
      this .fields .set ("rotation",    new X3D .Fields .SFFloat ());
      this .fields .set ("scaleFactor", new X3D .Fields .SFVec2f (1, 1));
      this .fields .set ("center",      new X3D .Fields .SFVec2f ());
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         converter .textureTransforms .push (converter .scene .getNamedNode (this .name));

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

      const textureTransformNode = converter .scene .createNode ("TextureTransform");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, textureTransformNode);

      // Assign values.

      textureTransformNode .translation = this .fields .get ("translation");
      textureTransformNode .rotation    = this .fields .get ("rotation");
      textureTransformNode .scale       = this .fields .get ("scaleFactor");
      textureTransformNode .center      = this .fields .get ("center");

      converter .textureTransforms .push (textureTransformNode);
   }

};
