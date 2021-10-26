package mono.android.app;

public class ApplicationRegistration {

	public static void registerApplications ()
	{
				// Application and Instrumentation ACWs must be registered first.
		mono.android.Runtime.register ("ByteApp.Droid.MainApplication, ByteApp.Android, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", crc641c4eafff62131bae.MainApplication.class, crc641c4eafff62131bae.MainApplication.__md_methods);
		
	}
}
