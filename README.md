This Google Apps script will move Gmail e-mails matching defined search queries to trash.

More info on Gmail Queries Given below.
* [Gmail Query Search](https://support.google.com/mail/answer/7190?hl=en)

## Other useful links

* [Google Apps Script](https://developers.google.com/apps-script/)
* [Manage Google App Script code with github/Bitbucket](https://github.com/leonhartX/gas-github)

## Getting Started

Create a Google Apps Script project at https://script.google.com/ using the content of delete-old-gmail.gs.  
Update `delete_queries` array to match your needs.  
Save, then run function `requestPermission` to get the appropriate permissions.   
After that run function addTriggers to add triggers that will execute the cleaner first after 6 minutes, then once per day.  
It will move 500 e-mail conversations/threads to trash per execution. If there are more e-mails to be moved, it will add another trigger after 6 minutes and continue to do so until it is done.


## Contributing

Pull request are welcome.
