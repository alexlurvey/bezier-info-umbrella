import {
    cubic,
    group,
    quadratic,
    svgDoc,
    circle,
    line,
} from '@thi.ng/geom';
import { draw } from '@thi.ng/hiccup-canvas';
import { convertTree } from "@thi.ng/hiccup-svg";
import { reactive } from '@thi.ng/rstream';
import { updateDOM } from '@thi.ng/transducers-hdom';
import { vec2, Vec2 } from '@thi.ng/vectors';

const W = 300;
const LINE_COL = 'cyan';
const LINE_ATTRS = { stroke: 'white', 'stroke-width': 1, 'stroke-dasharray': '5,5' };
const CIRCLE_ATTRS = { stroke: 'orange', 'stroke-width': 1 };
const CIRCLE_RADIUS = 8;

// setup canvas
const quadCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('quadratic-canvas')!;
const cubicCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cubic-canvas')!;
const quadraticCtx = quadCanvas.getContext('2d');
const cubicCtx = cubicCanvas.getContext('2d');
quadCanvas.width = quadCanvas.height = cubicCanvas.width = cubicCanvas.height = W;

// quadratic curve
const quadparts: [ Vec2, Vec2, Vec2 ] = [ vec2(70, 250), vec2(20, 110), vec2(250, 60) ];
const quadpoints = quadparts.map(v => circle(v, CIRCLE_RADIUS, CIRCLE_ATTRS));
const quadlines = [
    line(quadparts[0], quadparts[1], LINE_ATTRS),
    line(quadparts[1], quadparts[2], LINE_ATTRS),
];
const quadShape = group({ stroke: LINE_COL, 'stroke-width': 3 }, [quadratic(...quadparts), ...quadpoints, ...quadlines]);

// cubic curve
const cubicparts: [ Vec2, Vec2, Vec2, Vec2 ] = [ vec2(120, 160), vec2(35, 200), vec2(220, 260), vec2(220, 40) ];
const cubicpoints = cubicparts.map(v => circle(v, CIRCLE_RADIUS, CIRCLE_ATTRS));
const cubiclines = [
    line(cubicparts[0], cubicparts[1], LINE_ATTRS),
    line(cubicparts[1], cubicparts[2], LINE_ATTRS),
    line(cubicparts[2], cubicparts[3], LINE_ATTRS),
];
const cubicShape = group({ stroke: LINE_COL, 'stroke-width': 3 }, [cubic(...cubicparts), ...cubicpoints, ...cubiclines]);

// draw canvas
(quadraticCtx && draw(quadraticCtx, quadShape));
(cubicCtx && draw(cubicCtx, cubicShape));

// draw svg
const svgAttrs = {
    width: W,
    height: W,
    viewBox: `0 0 ${W} ${W}`,
};
const quadraticSvg = convertTree(svgDoc(svgAttrs, quadShape));
const cubicSvg = convertTree(svgDoc(svgAttrs, cubicShape));
reactive(quadraticSvg).transform(updateDOM({ root: document.getElementById('quadratic-svg')! }));
reactive(cubicSvg).transform(updateDOM({ root: document.getElementById('cubic-svg')! }));