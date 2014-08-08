This is a small plugin for [Biodalliance](http://www.biodalliance.org) which characterizes
BAM reads based on pairing and orientation and pokes extra labels into the `method` field
of the features (which can be styled).  It should disappear one day, once the stylesheet system
is sufficiently powerfull.

read-orientation-plugin required Dalliance 0.13 (or fairly recent master branch).

Configure a track using something like:

       {name: 'bamTest',
        overlay: [{
            bamURI: 'http://server/test-data/AJ-chr19-part.bam',
            bamGroup: true
        }],
        merge: readOrientationPlugin,
        padding: 1,
        stylesheet_uri: 'http://server/test-data/stylesheets/read-orientation.xml'}

Note the use of the overlay system even though there is actually only a single child track.
Overlays are used here because they're an easy way to add a plugin to filter features from an
existing back-end.