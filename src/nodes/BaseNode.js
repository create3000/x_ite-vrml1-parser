
export default class BaseNode
{
   constructor (X3D, scene, name)
   {
      this .X3D   = X3D;
      this .scene = scene;
      this .name  = name;

      this .fields = new Map ([
         ["children", [ ]],
      ]);
   }
};
