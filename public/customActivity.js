// Create a new connection for this session.
// We use this connection to talk to Journey Builder. You'll want to keep this
// reference handy and pass it into your UI framework if you're using React, Angular, Vue, etc.
const connection = new Postmonger.Session();
let activity = null;

$(function() {
    // setup our ui event handlers
    setupEventHandlers();
    // Journey Builder will trigger "initActivity" after it receives the "ready" event
    connection.on('initActivity', onInitActivity);
    connection.on('requestedInteractionDefaults', requestedInteractionDefaults);
    connection.on('requestedInteraction', requestedInteraction);

    // We're all set! let's signal Journey Builder
    // that we're ready to receive the activity payload...

    // Tell the parent iFrame that we are ready.
    connection.trigger('ready');

    // Tell the parent iFrame we want the Interaction Defaults
    connection.trigger('requestInteractionDefaults');

    // Tell the parent iFrame we want the Interaction
    connection.trigger('requestInteraction');
});

function requestedInteractionDefaults(payload) {
    // set the activity object from this payload. We'll refer to this object as we
    // modify it before saving.
    activity = payload;

    console.log('-------- requestedInteractionDefaults --------');
    console.log('payload\n', JSON.stringify(payload, null, 4));
    console.log('requestInteraction', payload);
    console.log('---------------------------------------------');
}
function requestedInteraction(payload) {
    console.log('-------- requestedInteraction --------');
    console.log('payload\n', JSON.stringify(payload, null, 4));
    console.log('requestInteraction', payload);
    console.log('--------------------------------------');
}

// this function is triggered by Journey Builder after it receives the "ready" signal
function onInitActivity(payload) {
    // set the activity object from this payload. We'll refer to this object as we
    // modify it before saving.
    activity = payload;

    console.log('-------- triggered:onInitActivity({obj}) --------');
    console.log('activity:\n ', JSON.stringify(activity, null, 4));
    console.log('-------------------------------------------------');
}

function onDoneButtonClick() {
    // we set must metaData.isConfigured in order to tell JB that
    // this activity is ready for activation
    activity['metaData'].isConfigured = true;

    // you can set the name that appears below the activity with the name property
    activity.name = 'Code Engagement';
    // get the option that the user selected and save it to
    console.log('------------ triggering:updateActivity({obj}) ----------------');
    console.log('Sending message back to updateActivity');
    console.log('saving\n', JSON.stringify(activity, null, 4));
    console.log('--------------------------------------------------------------');

    connection.trigger('updateActivity', activity);
}

function onCancelButtonClick() {
    // tell Journey Builder that this activity has no changes.
    // we wont be prompted to save changes when the inspector closes
    connection.trigger('setActivityDirtyState', false);

    // now request that Journey Builder closes the inspector/drawer
    connection.trigger('requestInspectorClose');
}

function setupEventHandlers() {
    $("#done").on('click', onDoneButtonClick);
    $("#cancel").on('click', onCancelButtonClick);
}

