import register from "../node_modules/x_ite-extension/dist/x_ite-extension.js";

register (X3D => class VRML1Parser extends X3D .X3DParser
{
   static {
      X3D .GoldenGate .addParsers (this);
   }

   constructor (scene)
   {
      super (scene);
   }

   getEncoding ()
   {
      return "STRING";
   }

   setInput (input)
   {
      this .input = input;
   }

   isValid ()
   {

      return true;
   }

   parseIntoScene (resolve, reject)
   {
      this .vrml ()
         .then (resolve)
         .catch (reject);
   }

   async vrml ()
   {
      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      scene .setEncoding ("VRML");
      scene .setProfile (browser .getProfile ("Interchange"));

      await this .loadComponents ();

      return scene;
   }
});
