# Event Tutorial Introduction - File & Directory API

If you haven't already, please read the previous [REST tutorial here](./intro.md). This tutorial builds on it.

Reslang can also specify which events a system generates. For REST APIs, the set of events are related to the HTTP verbs and we will send out a full representation of the resource every time. We do this by adding /events with a list of verbs after. Note that you can specify any one of the HTTP verbs to event on, as well as any user-defined ones (such as "removed", see below). However, any user-defined verb must be in lowercase to distinguish it from the standard HTTP set.

    "This models a file in a directory"
    subresource Directory::File {
        id: int
        name: string
        url: string
        fileTypeId: linked FileType

        contents: string queryonly

        /operations
            GET POST MULTIGET
        /events
            POST removed
    }

Now, in some cases, the resource lifecycle cannot capture the full set of events. In this case, use the "event" keyword to capture what events are produced by the service:

    "If a deletion is corrupted, we generate this event"
    event DirectoryDeleteIncomplete {
        /header
    	    timeOfFailure: datetime
        /payload
    	    directory: linked Directory
    	    corrupted: boolean
    }
    produces DirectoryDeleteIncomplete

You can also indicate that your service consumes various events:

    "An event of this type let's us know a directory has been changed"
    event DirectoryNotification {
        /header
            when: datetime
        /payload
    	    directory: linked Directory
    }
    consumes DirectoryNotification

You can even import event specifications from other modules, in the same way that you can import structures and resources.

Note that the payload is the body of the event. Header fields are transmitted as "attributes" in Google pubsub - they allow you to read information about the event without having to parse the body. REST resources have a predefined set of header fields related to the resource in question.

To generate AsyncAPI from this, we use:

    ./reslang ./models/file --open --events

This will open the browser on your specification, allowing you to view the events.
