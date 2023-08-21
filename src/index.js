/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {blocks} from './blocks/embedded';
import {embeddedGenerator} from './generators/embedded';
import {save, load} from './serialization';
import {toolbox} from './toolbox';
import './index.css';
import './plugins/block-plus-minus/procedures.js';
import './plugins/block-plus-minus/if.js';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);

Blockly.Themes.custom = Blockly.Theme.defineTheme('custom', {
    'base': Blockly.Themes.Zelos,
    'categoryStyles': {
        'bitwise_category': {
            'colour': '#FB0604'
        },
        'io_category': {
            'colour': '#EF9B10'
        },
        'time_category': {
            'colour': '#FF00B8'
        },
        'clk_category': {
            'colour': '#FFBF00'
        },

        'led_category':{
            'colour': '#FFBF00'
        }

    },
    'blockStyles': {
        'bitwise_blocks': {
            'colourPrimary': '#FB0604',
            'colourSecondary': '#FB8204',
            'colourTertiary': '#9a1413',
        },
        'io_blocks': {
            'colourPrimary': '#EF9B10',
            'colourSecondary': '#D3EF10',
            'colourTertiary': '#b07b15',
        },
        'time_blocks': {
            'colourPrimary': '#FF00B8',
            'colourSecondary': '#FF0039',
            'colourTertiary': '#af1385',
        },
        'clk_blocks': {
            'colourPrimary': '#FFBF00',
            'colourSecondary': '#C0FF00',
            'colourTertiary': '#FF4000',
        },

        'led_blocks': {
            'colourPrimary': '#FFBF00',
            'colourSecondary': '#FFBF00',
            'colourTertiary': '#FFBF00',
        },

    },
    'componentStyles': {
        'workspaceBackgroundColour': '#ffffff',
        'toolboxBackgroundColour': '#041e41',
        'toolboxForegroundColour': '#fdfdfd',
        'flyoutBackgroundColour': '#015b95', //#015b95
        'flyoutForegroundColour': '#ccc',
        'flyoutOpacity': 1,
        'scrollbarColour': '#0D0055FF',
        'insertionMarkerColour': '#fff',
        'insertionMarkerOpacity': 0.3,
        'scrollbarOpacity': 0,
        'cursorColour': '#d0d0d0',
        'blackBackground': '#333'
    }
});

// Set up UI elements and inject Blockly
//const downloadDiv = document.getElementById('dlDiv')


const codeDiv = document.getElementById('generatedCode').firstChild;
const outputDiv = document.getElementById('output');
const pageContainer = document.getElementById("pageContainer")

const blocklyArea = document.getElementById('blocklyArea');
const blocklyCode = document.getElementById('blocklyCode');

const blocklyDiv = document.getElementById('blocklyDiv');
const outputPane = document.getElementById('outputPane');

const ws = Blockly.inject(blocklyDiv, {
    renderer: 'zelos',
    theme: Blockly.Themes.custom,
    toolbox,
    zoom:
        {controls: true,
            wheel: false,
            startScale: 0.75,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2,
            pinch: true},
    trashcan: true,

    });

var onresize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    let element = blocklyArea;
    let x = 0;
    let y = 0;

    let element1 = blocklyCode;
    let x1 = 0;
    let y1 = 0;

    do {
        x1 += element1.offsetLeft;
        y1 += element1.offsetTop;
        element1 = element1.offsetParent;


    } while (element1);
    // Position blocklyDiv over blocklyArea.
    pageContainer.style.left = x1 + 'px';
    pageContainer.style.top = y1 + 'px';
    pageContainer.style.width = blocklyCode.offsetWidth + 'px';
    pageContainer.style.height = blocklyCode.offsetHeight + 'px';


    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;


    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';


    Blockly.svgResize(ws);

    console.log('resize');
};

window.addEventListener('resize', onresize, false);
onresize();








// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.

const runCode = () => {
    const preamble = '#include "TM4C123GH6PM.h"\n\n';
    const code = preamble + embeddedGenerator.workspaceToCode(ws);
    codeDiv.innerText = code;
    outputDiv.innerHTML = '';
};


// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
});


// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application startzzs.
  // Don't run the code during drags; we might have invalid state.
  if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()) {
    return;
  }
  runCode();
});

const slider = document.querySelector('.slider');

const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const indicatorParents = document.querySelector('.controls ul');

var sectionIndex = 0;

document.querySelectorAll('.controls li'). forEach(function (indicator, ind) {
    indicator.addEventListener('click', function (){
        sectionIndex = ind;
        document.querySelector('.controls .selected').classList.remove('selected');
        indicator.classList.add('selected');
        slider.style.transform = 'translate(' + (ind) * -10 + '%)';
    });
});

leftArrow.addEventListener('click', function () {
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1: 0;
    document.querySelector('.controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * -10 + '%)';
});


rightArrow.addEventListener('click', function () {
    sectionIndex = (sectionIndex < 9) ? sectionIndex + 1: 9;
    document.querySelector('.controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * -10 + '%)';
});

let FactoryUtils = FactoryUtils || Object.create(null);
/**
 * Create a file with the given attributes and download it.
 * @param {string} contents The contents of the file.
 * @param {string} filename The name of the file to save to.
 * @param {string} fileType The type of the file to save.
 */





