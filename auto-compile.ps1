 #watch a directory, for changes to TypeScript files.  
 #  
 #when a file changes, then re-compile it.  
 $watcher = New-Object System.IO.FileSystemWatcher  
 $watcher.Path = pwd  
 $watcher.IncludeSubdirectories = $true  
 $watcher.EnableRaisingEvents = $true  
 $changed = Register-ObjectEvent $watcher "Changed" -Action {  
   if ($($eventArgs.FullPath).EndsWith(".ts"))  
   {  
     $command = '"c:\Program Files (x86)\Microsoft SDKs\TypeScript\tsc.exe" "$($eventArgs.FullPath)"'  
     write-host '>>> Recompiling file ' $($eventArgs.FullPath)  
     iex "& $command"  
   }  
 }  
 write-host 'changed.Id:' $changed.Id  
 #to stop the watcher, then close the PowerShell window, OR run this command:  
 # Unregister-Event < change Id >  