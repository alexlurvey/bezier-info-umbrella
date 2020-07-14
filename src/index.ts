import {
    cubic,
    group,
    quadratic,
    svgDoc,
} from '@thi.ng/geom';
import { convertTree } from "@thi.ng/hiccup-svg";
import { stream } from '@thi.ng/rstream';
import { updateDOM } from '@thi.ng/transducers-hdom';
import { vec2 } from '@thi.ng/vectors';

const W = 250;
const LINE_COL = 'cyan';

const canvas1: HTMLCanvasElement = document.createElement("canvas");
const canvas2: HTMLCanvasElement = document.createElement("canvas");
const div1 = document.createElement('div');
const div2 = document.createElement('div');
canvas1.width = canvas1.height = canvas2.width = canvas2.height = W;
// document.body.appendChild(canvas1);
// document.body.appendChild(canvas2);
document.body.appendChild(div1);
document.body.appendChild(div2);

const curve1 = quadratic(vec2(70, 250), vec2(20, 110), vec2(250, 60));
const curve2 = cubic(vec2(120, 160), vec2(35, 200), vec2(220, 260), vec2(220, 40));

const svg1 = convertTree(
    svgDoc(
        {
            width: W,
            height: W,
            viewBox: `0 0 ${W} ${W}`,
            fill: "none",
            stroke: LINE_COL,
            "stroke-width": 3,
        },
        group({ stroke: LINE_COL, 'stroke-width': 5 }, [curve1])
    )
)

const svg2 = convertTree(
    svgDoc(
        {
            width: W,
            height: W,
            viewBox: `0 0 ${W} ${W}`,
            fill: "none",
            stroke: LINE_COL,
            "stroke-width": 3,
        },
        group({ stroke: LINE_COL, 'stroke-width': 5 }, [curve2])
    )
)

const str1 = stream<any>().transform(updateDOM({ root: div1 }));
const str2 = stream<any>().transform(updateDOM({ root: div2 }));
str1.next(svg1);
str2.next(svg2);

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => {});
}

