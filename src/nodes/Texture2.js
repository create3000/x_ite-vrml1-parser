import BaseNode from "./BaseNode.js";

export default class Texture2 extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("filename", new X3D .Fields .SFString ());
      this .fields .set ("image",    new X3D .Fields .SFImage ());
      this .fields .set ("wrapS",    new X3D .Fields .SFString ("REPEAT"));
      this .fields .set ("wrapT",    new X3D .Fields .SFString ("REPEAT"));
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         converter .textures .push (converter .scene .getNamedNode (this .name));

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

      if (this .fields .get ("filename") .length)
      {
         // Create nodes.

         const textureNode = converter .scene .createNode ("ImageTexture");

         // Set name.

         if (this .name)
            converter .scene .updateNamedNode (this .name, textureNode);

         // Assign values.

         textureNode .url     = [ this .fields .get ("filename") .getValue () ];
         textureNode .repeatS = this .fields .get ("wrapS") .getValue () !== "CLAMP";
         textureNode .repeatT = this .fields .get ("wrapT") .getValue () !== "CLAMP";

         converter .textures .push (textureNode);
      }
      else
      {
         // Create nodes.

         const textureNode = converter .scene .createNode ("PixelTexture");

         // Set name.

         if (this .name)
            converter .scene .updateNamedNode (this .name, textureNode);

         // Assign values.

         textureNode .image   = this .fields .get ("image");
         textureNode .repeatS = this .fields .get ("wrapS") .getValue () !== "CLAMP";
         textureNode .repeatT = this .fields .get ("wrapT") .getValue () !== "CLAMP";

         converter .textures .push (textureNode);
      }
   }
};
