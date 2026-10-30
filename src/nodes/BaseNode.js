
export default class BaseNode
{
   constructor (X3D, scene, typeName, name)
   {
      this .X3D      = X3D;
      this .scene    = scene;
      this .typeName = typeName;
      this .name     = name;
      this .fields   = new Map ();

      this .fields .set ("children", [ ]);
   }

   convert ()
   { }
};
