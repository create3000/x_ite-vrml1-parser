import BaseNode from "./BaseNode.js";

export default class Environment extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("ambientIntensity", new X3D .Fields .SFFloat (0.2));
      this .fields .set ("ambientColor",     new X3D .Fields .SFColor (1, 1, 1));
      this .fields .set ("attenuation",      new X3D .Fields .SFVec3f (0, 0, 1));
      this .fields .set ("fogType",          new X3D .Fields .SFString ("NONE"));
      this .fields .set ("fogColor",         new X3D .Fields .SFColor (1, 1, 1));
      this .fields .set ("fogVisibility",    new X3D .Fields .SFFloat ());
   }
};
