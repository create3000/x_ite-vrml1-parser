import BaseNode from "./BaseNode.js";

export default class PointSound extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("name",        new X3D .Fields .MFString ());
      this .fields .set ("description", new X3D .Fields .SFString ());
      this .fields .set ("intensity",   new X3D .Fields .SFFloat (1));
      this .fields .set ("location",    new X3D .Fields .SFVec3f ());
      this .fields .set ("minRange",    new X3D .Fields .SFFloat (10));
      this .fields .set ("maxRange",    new X3D .Fields .SFFloat (10));
      this .fields .set ("loop",        new X3D .Fields .SFBool ());
      this .fields .set ("start",       new X3D .Fields .SFTime ());
      this .fields .set ("pause",       new X3D .Fields .SFTime ());
   }
};
