import BaseNode from "./BaseNode.js";

export default class NavigationInfo extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("type",            new X3D .Fields .MFString ("walk"));
      this .fields .set ("speed",           new X3D .Fields .SFFloat (1));
      this .fields .set ("collisionRadius", new X3D .Fields .SFFloat (1));
      this .fields .set ("headlight",       new X3D .Fields .SFBool (true));
   }
};
