# Lab 1: Create a to-do list cli that contains the following commands :

### 1- Users can add entry.

    Example
    	node index.js add “To do entry”

**Notes: The entry should contain an incremental id**

### 2 - Users Can list Entries - All entries:

    Example
    	node index.js list

**Note: with format Title: ID: id, Title: title, Status: ${status}
Use single console.log() (not in for loop)**

### 3 - Users can edit their entry through the id

    Make individual edits
    Examples
    	node index.js edit 123 “Edited title”

### 4 - Users can delete their entry using their id

    Example
    	node index.js delete 123

<hr>

## Bouns:

You can use a NPM package to parse the cli argv

### 1 - Entries is added by default with status property which has “to-do” value

### 2 - edit

Users can mark their entry as done by id

Options :

-s/--status one of the values [“to-do”,”in-progress”,”done”]

    Examples:
    	node index.js edit -s “done” -t “Edited title” -id 123

### 3 - list: - Specific status using -s -- status

Options:

-s/--status one of the values [“to-do”, “in-progress” ,”done”] (optional parameter)

    Example:
    node index.js list -s “done”
