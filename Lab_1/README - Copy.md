Please read the whole file before starting to code.

	Create a to-do list cli that contains the following commands : 

1 - Users can add entry,
Example
node index.js add “To do entry”
Notes:
The entry should contain an incremental id

2 - Users Can list Entries
	-  All entries:
		node index.js list
 with format Title: ID: $id Title: ${title} Status: ${status}
Use single console.log() (not in for loop)

 3 - Users can edit their entry through the id
Make individual edits
Examples
            node index.js edit 123 “Edited title”
===> will edit entry with id  123  to be “Edited title”

4 - Users can delete their entry using their id
	Example
		node index.js delete 123

Bouns:

You can use a NPM package to parse the cli argv
1 - Entries is added by default with status property which has “to-do” value
2 - edit 
	Users can mark their entry as done by id 
		Options : 
		    -s/--status one of the values [“to-do”,”in-progress”,”done”]
            Examples: 
 node index.js edit -s “done” -t “Edited title” -id 123
Note: 
In this case user should specify -t or -s or both
								

3 - list: 
     - Specific status using -s -- status
	Options: 
	 -s/--status  one of the values [“to-do”,  “in-progress” ,”done”] (optional parameter)
	Example: 
node index.js list -s “done”

Notes: 
Please make sure that you separate your logic in functions
Make the names of your functions and variables are expressive sof what they are
Start by defining each functionality and the steps you should make to achieve it
Please make sure not to pollute the global scope[refrain from using global variables]
Before writing a function, ask yourself, is there a function in javascript that can do that, if not, write your own.
You initialize your app with npm init to be able to use npm and download packages
Take a minute or two to read the package.json file
Tips:
If you can’t do something, search, then ask for help, this is not an exam.
Please please please, don’t copy someone else’s code.
Make sure to take a few minutes to read about the commander library that you’ll be using.
Start with implementing the required then move to the bonus

Useful Links:
 npm | build amazing things
Nodejs Docs
Fs module docs fs (you will need to use the sync version of the functions)[ends with the word Sync]
Cli helper library name is commander, search for it at npm.
Don't Block the Event Loop (or the Worker Pool)


