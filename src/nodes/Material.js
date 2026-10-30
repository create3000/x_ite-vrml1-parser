import BaseNode from "./BaseNode.js";

export default class Material extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("point", new X3D .Fields .MFVec3f ());

      this .fields .set ("ambientColor",  new X3D .Fields .MFColor (new X3D .Fields .SFColor (0.2, 0.2, 0.2)));
      this .fields .set ("diffuseColor",  new X3D .Fields .MFColor (new X3D .Fields .SFColor (0.8, 0.8, 0.8)));
      this .fields .set ("specularColor", new X3D .Fields .MFColor (new X3D .Fields .SFColor (0, 0, 0)));
      this .fields .set ("emissiveColor", new X3D .Fields .MFColor (new X3D .Fields .SFColor (0, 0, 0)));
      this .fields .set ("shininess",     new X3D .Fields .MFFloat (0.2));
      this .fields .set ("transparency",  new X3D .Fields .MFFloat (0));
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         converter .materials .push (converter .scene .getNamedNode (this .name));

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

      const materialNode = converter .scene .createNode ("Material");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, materialNode);

      // Assign values.

      if (this .fields .get ("ambientColor") .length)
      {
         const hsv = this .fields .get ("ambientColor") [0] .getHSV ();

         materialNode .ambientIntensity = hsv [2];
      }

      if (this .fields .get ("diffuseColor") .length)
         materialNode .diffuseColor = this .fields .get ("diffuseColor") [0];

      if (this .fields .get ("specularColor") .length)
         materialNode .specularColor = this .fields .get ("specularColor") [0];

      if (this .fields .get ("emissiveColor") .length)
         materialNode .emissiveColor = this .fields .get ("emissiveColor") [0];

      if (this .fields .get ("shininess") .length)
         materialNode .shininess = this .fields .get ("shininess") [0];

      if (this .fields .get ("transparency") .length)
         materialNode .transparency = this .fields .get ("transparency") [0];

      converter .materials .push (materialNode);
   }
};
