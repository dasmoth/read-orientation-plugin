// Currently not exported from compiled Dalliance builds.  Maybe should be?
var BamFlags = {
    MULTIPLE_SEGMENTS:       0x1,
    ALL_SEGMENTS_ALIGN:      0x2,
    SEGMENT_UNMAPPED:        0x4,
    NEXT_SEGMENT_UNMAPPED:   0x8,
    REVERSE_COMPLEMENT:      0x10,
    NEXT_REVERSE_COMPLEMENT: 0x20,
    FIRST_SEGMENT:           0x40,
    LAST_SEGMENT:            0x80,
    SECONDARY_ALIGNMENT:     0x100,
    QC_FAIL:                 0x200,
    DUPLICATE:               0x400,
    SUPPLEMENTARY:           0x800
};

function readOrientationPlugin(featureSets) {
    var features = featureSets[0];
    for (var fi = 0; fi < features.length; ++fi) {
        var feature = features[fi];
        var flags = feature.bamRecord.flag;

        if (feature.bamRecord.mq == 0) {
            feature.method = 'zeroq';
        } else if ((flags & BamFlags.MULTIPLE_SEGMENTS) && (flags & BamFlags.ALL_SEGMENTS_ALIGN)) {
            feature.method = 'correctly-paired';
        } else if (flags & BamFlags.NEXT_SEGMENT_UNMAPPED) {
            feature.method = 'unpaired';
        } else if (!(flags & BamFlags.ALL_SEGMENTS_ALIGN) && 
            (((flags & BamFlags.REVERSE_COMPLEMENT) && (flags & BamFlags.NEXT_REVERSE_COMPLEMENT)) ||
             (!(flags & BamFlags.REVERSE_COMPLEMENT) && !(flags & BamFlags.NEXT_REVERSE_COMPLEMENT)))) {
                feature.method = 'parallel';
        }
    }
    return features;
}
