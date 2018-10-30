// put your Gmail search queries here.
var delete_queries = [
  "label:cron older_than:14d",
  "label:alerts older_than:14d"
];

function requestPermission() {
  return;
}

function removeTriggers() {
  console.info('Removing old triggers.');
  var triggers = ScriptApp.getProjectTriggers();
  for (var i=0; i<triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
}

function addTriggers() {
  
  // Remove old triggers
  removeTriggers();

  // First run 6 mins after install
  console.info('Scheduling trigger 6 minutes from now.');
  ScriptApp.newTrigger('deleteGmail')
    .timeBased()
    .at(new Date((new Date()).getTime() + 1000*60*6))
    .create();
  
  // Run daily there after
  console.info('Scheduling daily trigger.');
  ScriptApp.newTrigger('deleteGmail')
    .timeBased().everyDays(1).create();

}

function deleteGmail() {
  
  while ( delete_queries.length>0 ) {
    var q = delete_queries.pop();
    var Threads = GmailApp.search(q, 0, 500);
    console.info("Search Query '" + q + "' returned %d Gmail Threads", Threads.length);

    // if there are 500 threads, schedule a new execution in 6 minutes
    if (Threads.length == 500) {
      console.info("Scheduling follow up execution...");
      addTriggers();
    }
    
    while ( Threads.length > 100 ) {
      var lessThreads = Threads.slice(0, 100);
      Threads = Threads.slice(100);
      GmailApp.moveThreadsToTrash(lessThreads);
      console.info('Moved %d threads to trash', lessThreads.length);
    }
    GmailApp.moveThreadsToTrash(Threads);
    console.info('Moved %d threads to trash', Threads.length);
  }
}
