import BaseNode from "./BaseNode.js";

export default class DirectedSound extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .get ("name",        new X3D .Fields .MFString ());
      this .fields .get ("description", new X3D .Fields .SFString ());
      this .fields .get ("intensity",   new X3D .Fields .SFFloat (1));
      this .fields .get ("location",    new X3D .Fields .SFVec3f ());
      this .fields .get ("direction",   new X3D .Fields .SFVec3f (0, 0, 1));
      this .fields .get ("minRange",    new X3D .Fields .SFFloat (10));
      this .fields .get ("maxRange",    new X3D .Fields .SFFloat (10)),
      this .fields .get ("minAngle",    new X3D .Fields .SFFloat (0.785398));
      this .fields .get ("maxAngle",    new X3D .Fields .SFFloat (0.785398));
      this .fields .get ("loop",        new X3D .Fields .SFBool (false));
      this .fields .get ("start",       new X3D .Fields .SFTime ());
      this .fields .get ("pause",       new X3D .Fields .SFTime ());
   }
};
