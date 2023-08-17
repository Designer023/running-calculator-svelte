import { describe, it, expect } from 'vitest';

import {hhmmssToSec} from "$lib/calculations/conversions/hhmmssToSec";

describe('convert HH:MM:SS to seconds', () => {
    it('21 seconds to go', () => {
        expect(hhmmssToSec(0,0, 21)).toBe(21);
    });

    it('1 min = 60s', () => {
        expect(hhmmssToSec(0,1, 0)).toBe(60);
    });

    it('1 hour = 3600s', () => {
        expect(hhmmssToSec(1,0, 0)).toBe(3600);
    });

    it('1 hour, 1 min, 1 sec = 3661s', () => {
        expect(hhmmssToSec(1,1, 1)).toBe(3661);
    });

    it('70 sec = 70s', () => {
        expect(hhmmssToSec(0,0, 70)).toBe(70);
    });
});
