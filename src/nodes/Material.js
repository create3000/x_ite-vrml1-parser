import BaseNode from "./BaseNode.js";

export default class Material extends BaseNode
{
   constructor (X3D, scene, typeName, name)
   {
      super (X3D, scene, "Material", typeName, name);

      this .fields .set ("point", new X3D .Fields .MFVec3f ());

      this .fields .set ("ambientColor",  new X3D .Fields .MFColor (new X3D .Fields .SFColor (0.2, 0.2, 0.2)));
      this .fields .set ("diffuseColor",  new X3D .Fields .MFColor (new X3D .Fields .SFColor (0.8, 0.8, 0.8)));
      this .fields .set ("specularColor", new X3D .Fields .MFColor (new X3D .Fields .SFColor (0, 0, 0)));
      this .fields .set ("emissiveColor", new X3D .Fields .MFColor (new X3D .Fields .SFColor (0, 0, 0)));
      this .fields .set ("shininess",     new X3D .Fields .MFFloat (0.2));
      this .fields .set ("transparency",  new X3D .Fields .MFFloat (0));
   }
};
