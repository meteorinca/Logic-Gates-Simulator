// Logic Gates Simulator - Tutorials and Lessons module
// This file runs the conceptual CMOS slides and interactive challenges.

var TUTORIAL_LESSONS = [
	{
		title: "1. What is Digital?",
		type: "theory",
		content: `
			<p>In analog electronics, signals can be any voltage (e.g. 1.2V, 3.7V). In <strong>digital electronics</strong>, we simplify everything into just two states:</p>
			<div class="theory-box">
				<div class="state-item"><span class="badge high">HIGH</span> <span>1 / ON / True (usually 5V or 3.3V)</span></div>
				<div class="state-item"><span class="badge low">LOW</span> <span>0 / OFF / False (0V / Ground)</span></div>
			</div>
			<p>This abstraction makes computers robust against electrical noise. All modern computers process information by manipulating these 1s and 0s using <strong>logic gates</strong>.</p>
		`
	},
	{
		title: "2. The Transistor",
		type: "theory",
		content: `
			<p>How do we manipulate electrical signals? With <strong>transistors</strong>! A transistor is simply an <strong>electrically controlled switch</strong> with three terminals:</p>
			<div class="transistor-diag">
				<div class="terminal">🔌 <strong>Source/Collector:</strong> Current inflow</div>
				<div class="terminal">⚡ <strong>Gate/Base:</strong> Control line (turns switch ON/OFF)</div>
				<div class="terminal">💡 <strong>Drain/Emitter:</strong> Current outflow</div>
			</div>
			<p>By applying a voltage to the Gate, we control whether current flows between Source and Drain. With no moving parts, transistors can switch billions of times per second!</p>
		`
	},
	{
		title: "3. N-Type vs P-Type",
		type: "theory",
		content: `
			<p>Modern computers use <strong>CMOS technology</strong>, which pairs two complementary types of transistors:</p>
			<div class="theory-box" style="display: flex; flex-direction: column; gap: 8px;">
				<div><strong>⚡ N-Channel MOSFET (NMOS):</strong><br>
				Acts like a <em>Normally Open</em> switch. It closes (turns <strong>ON</strong>) when the Gate is <span class="badge high">HIGH (1)</span>.</div>
				<div><strong>❄️ P-Channel MOSFET (PMOS):</strong><br>
				Acts like a <em>Normally Closed</em> switch. It closes (turns <strong>ON</strong>) when the Gate is <span class="badge low">LOW (0)</span>.</div>
			</div>
			<p>By combining NMOS and PMOS, we can design circuits that don't waste power when idling!</p>
		`
	},
	{
		title: "4. Building a NOT Gate",
		type: "theory",
		content: `
			<p>A <strong>NOT gate</strong> (Inverter) outputs the opposite of its input. Here is how we build it using CMOS:</p>
			<div class="schematic">
				<div class="schematic-node">🔌 <strong>Power (5V)</strong></div>
				<div class="schematic-line">↓</div>
				<div class="schematic-node pm"><strong>PMOS Transistor</strong> (ON when Input is 0)</div>
				<div class="schematic-line">↓ &nbsp;➔ &nbsp;<strong>Output</strong></div>
				<div class="schematic-node nm"><strong>NMOS Transistor</strong> (ON when Input is 1)</div>
				<div class="schematic-line">↓</div>
				<div class="schematic-node">💀 <strong>Ground (0V)</strong></div>
			</div>
			<p style="font-size: 11px; line-height: 1.4; color: var(--text-muted);">
				If Input is <strong>1</strong>: NMOS turns ON, connecting Output to Ground (0). PMOS is OFF.<br>
				If Input is <strong>0</strong>: PMOS turns ON, connecting Output to Power (1). NMOS is OFF.
			</p>
		`
	},
	{
		title: "5. Series vs Parallel (Gates)",
		type: "theory",
		content: `
			<p>To combine multiple inputs, we arrange transistors in series or parallel:</p>
			<div class="theory-box" style="display: flex; flex-direction: column; gap: 8px;">
				<div><strong>🔒 Series (AND logic):</strong><br>
				Current must flow through both transistors. Current only flows if <em>both</em> gates are ON.</div>
				<div><strong>🔓 Parallel (OR logic):</strong><br>
				Current can flow through either path. Current flows if <em>at least one</em> gate is ON.</div>
			</div>
			<p>By connecting transistors in these configurations, we build NAND, NOR, AND, and OR gates, which form the brain of all microchips.</p>
		`
	},
	{
		title: "6. Connect Inputs & Outputs",
		type: "lab",
		setupData: '{"canvas":{"x":-120,"y":-60},"circuits":[{"type":"button","id":0,"x":150,"y":200},{"type":"light","id":1,"x":450,"y":200}]}',
		instructions: "Connect the button to the light, then turn the button ON.",
		goals: [
			{ id: "connect", text: "Connect Button to Light" },
			{ id: "power", text: "Turn the Button ON" }
		],
		check: function() {
			var button = Circuit.findById(0);
			var light = Circuit.findById(1);
			if (!button || !light) return { connect: false, power: false };

			var connected = false;
			if (light.inputs[0] && light.inputs[0].wires.length > 0) {
				var wire = light.inputs[0].wires[0];
				if (wire.output && wire.output.circuit && wire.output.circuit.id === 0) {
					connected = true;
				}
			}

			var powered = connected && light.has_power;
			return { connect: connected, power: powered };
		}
	},
	{
		title: "7. Inverting Signals (NOT)",
		type: "lab",
		setupData: '{"canvas":{"x":-120,"y":-60},"circuits":[{"type":"button","id":0,"x":100,"y":200},{"type":"not","id":1,"x":280,"y":200},{"type":"light","id":2,"x":460,"y":200}]}',
		instructions: "Connect the Button through the NOT gate to the Light, and test how it inverts.",
		goals: [
			{ id: "connect", text: "Wire: Button ➔ NOT ➔ Light" },
			{ id: "test_off", text: "See Light ON when Button is OFF" },
			{ id: "test_on", text: "See Light OFF when Button is ON" }
		],
		check: function(state) {
			if (!state.visited) {
				state.visited = { off: false, on: false };
			}
			var btn = Circuit.findById(0);
			var notGate = Circuit.findById(1);
			var light = Circuit.findById(2);
			if (!btn || !notGate || !light) return { connect: false, test_off: false, test_on: false };

			var c1 = false;
			if (notGate.inputs[0] && notGate.inputs[0].wires.length > 0) {
				if (notGate.inputs[0].wires[0].output.circuit.id === 0) {
					c1 = true;
				}
			}
			var c2 = false;
			if (light.inputs[0] && light.inputs[0].wires.length > 0) {
				if (light.inputs[0].wires[0].output.circuit.id === 1) {
					c2 = true;
				}
			}
			var connected = c1 && c2;

			if (connected) {
				if (!btn.has_power && light.has_power) state.visited.off = true;
				if (btn.has_power && !light.has_power) state.visited.on = true;
			} else {
				state.visited.off = false;
				state.visited.on = false;
			}

			return {
				connect: connected,
				test_off: state.visited.off,
				test_on: state.visited.on
			};
		}
	},
	{
		title: "8. The AND Function",
		type: "lab",
		setupData: '{"canvas":{"x":-120,"y":-60},"circuits":[{"type":"button","id":0,"x":100,"y":130},{"type":"button","id":1,"x":100,"y":270},{"type":"and","id":2,"x":280,"y":200},{"type":"light","id":3,"x":460,"y":200}]}',
		instructions: "Connect both buttons to the AND gate and the gate to the light. Activate both inputs.",
		goals: [
			{ id: "connect", text: "Wire both Buttons ➔ AND ➔ Light" },
			{ id: "toggle_mode", text: "Switch buttons to TOGGLE mode" },
			{ id: "power", text: "Turn the Light ON (both inputs ON)" }
		],
		check: function() {
			var btn1 = Circuit.findById(0);
			var btn2 = Circuit.findById(1);
			var andGate = Circuit.findById(2);
			var light = Circuit.findById(3);
			if (!btn1 || !btn2 || !andGate || !light) return { connect: false, toggle_mode: false, power: false };

			var c1 = false;
			if (andGate.inputs[0] && andGate.inputs[0].wires.length > 0) {
				var src = andGate.inputs[0].wires[0].output.circuit.id;
				if (src === 0 || src === 1) c1 = true;
			}
			var c2 = false;
			if (andGate.inputs[1] && andGate.inputs[1].wires.length > 0) {
				var src = andGate.inputs[1].wires[0].output.circuit.id;
				if (src === 0 || src === 1) c2 = true;
			}
			var c3 = false;
			if (light.inputs[0] && light.inputs[0].wires.length > 0) {
				if (light.inputs[0].wires[0].output.circuit.id === 2) c3 = true;
			}
			var connected = c1 && c2 && c3 && (andGate.inputs[0].wires[0].output.circuit.id !== andGate.inputs[1].wires[0].output.circuit.id);

			var toggled = btn1.data.is_toggle && btn2.data.is_toggle;

			var powered = connected && light.has_power;

			return {
				connect: connected,
				toggle_mode: toggled,
				power: powered
			};
		}
	},
	{
		title: "9. The OR Function",
		type: "lab",
		setupData: '{"canvas":{"x":-120,"y":-60},"circuits":[{"type":"button","id":0,"x":100,"y":130},{"type":"button","id":1,"x":100,"y":270},{"type":"or","id":2,"x":280,"y":200},{"type":"light","id":3,"x":460,"y":200}]}',
		instructions: "Connect both buttons to the OR gate and the gate to the light. Activate only one button.",
		goals: [
			{ id: "connect", text: "Wire both Buttons ➔ OR ➔ Light" },
			{ id: "test_single", text: "Turn Light ON with ONLY ONE button active" }
		],
		check: function() {
			var btn1 = Circuit.findById(0);
			var btn2 = Circuit.findById(1);
			var orGate = Circuit.findById(2);
			var light = Circuit.findById(3);
			if (!btn1 || !btn2 || !orGate || !light) return { connect: false, test_single: false };

			var c1 = false;
			if (orGate.inputs[0] && orGate.inputs[0].wires.length > 0) {
				var src = orGate.inputs[0].wires[0].output.circuit.id;
				if (src === 0 || src === 1) c1 = true;
			}
			var c2 = false;
			if (orGate.inputs[1] && orGate.inputs[1].wires.length > 0) {
				var src = orGate.inputs[1].wires[0].output.circuit.id;
				if (src === 0 || src === 1) c2 = true;
			}
			var c3 = false;
			if (light.inputs[0] && light.inputs[0].wires.length > 0) {
				if (light.inputs[0].wires[0].output.circuit.id === 2) c3 = true;
			}
			var connected = c1 && c2 && c3 && (orGate.inputs[0].wires[0].output.circuit.id !== orGate.inputs[1].wires[0].output.circuit.id);

			var singleActive = connected && light.has_power && ((btn1.has_power && !btn2.has_power) || (!btn1.has_power && btn2.has_power));

			return {
				connect: connected,
				test_single: singleActive
			};
		}
	},
	{
		title: "10. Difference Detector (XOR)",
		type: "lab",
		setupData: '{"canvas":{"x":-120,"y":-60},"circuits":[{"type":"button","id":0,"x":100,"y":130},{"type":"button","id":1,"x":100,"y":270},{"type":"xor","id":2,"x":280,"y":200},{"type":"light","id":3,"x":460,"y":200}]}',
		instructions: "Connect the buttons to the XOR gate and wire it to the light. Test its exclusive behavior.",
		goals: [
			{ id: "connect", text: "Wire both Buttons ➔ XOR ➔ Light" },
			{ id: "test_diff", text: "Light is ON when inputs differ" },
			{ id: "test_same", text: "Light is OFF when both inputs are ON" }
		],
		check: function(state) {
			if (!state.visited) {
				state.visited = { diff: false, same: false };
			}
			var btn1 = Circuit.findById(0);
			var btn2 = Circuit.findById(1);
			var xorGate = Circuit.findById(2);
			var light = Circuit.findById(3);
			if (!btn1 || !btn2 || !xorGate || !light) return { connect: false, test_diff: false, test_same: false };

			var c1 = false;
			if (xorGate.inputs[0] && xorGate.inputs[0].wires.length > 0) {
				var src = xorGate.inputs[0].wires[0].output.circuit.id;
				if (src === 0 || src === 1) c1 = true;
			}
			var c2 = false;
			if (xorGate.inputs[1] && xorGate.inputs[1].wires.length > 0) {
				var src = xorGate.inputs[1].wires[0].output.circuit.id;
				if (src === 0 || src === 1) c2 = true;
			}
			var c3 = false;
			if (light.inputs[0] && light.inputs[0].wires.length > 0) {
				if (light.inputs[0].wires[0].output.circuit.id === 2) c3 = true;
			}
			var connected = c1 && c2 && c3 && (xorGate.inputs[0].wires[0].output.circuit.id !== xorGate.inputs[1].wires[0].output.circuit.id);

			if (connected) {
				if (light.has_power && (btn1.has_power !== btn2.has_power)) state.visited.diff = true;
				if (!light.has_power && btn1.has_power && btn2.has_power) state.visited.same = true;
			} else {
				state.visited.diff = false;
				state.visited.same = false;
			}

			return {
				connect: connected,
				test_diff: state.visited.diff,
				test_same: state.visited.same
			};
		}
	},
	{
		title: "11. Memory Cell (SR Latch)",
		type: "lab",
		setupData: '{"canvas":{"x":-200,"y":-110},"circuits":[{"type":"button","id":0,"x":80,"y":100,"output_connections":[{"wires":[{"input_circuit_id":2,"input_index":0}]}]},{"type":"button","id":1,"x":80,"y":300,"output_connections":[{"wires":[{"input_circuit_id":3,"input_index":0}]}]},{"type":"nor","id":2,"x":280,"y":100,"output_connections":[{"wires":[{"input_circuit_id":3,"input_index":1},{"input_circuit_id":4,"input_index":0}]}]},{"type":"nor","id":3,"x":280,"y":300,"output_connections":[{"wires":[{"input_circuit_id":2,"input_index":1},{"input_circuit_id":5,"input_index":0}]}]},{"type":"light","id":4,"x":460,"y":100},{"type":"light","id":5,"x":460,"y":300}]}',
		instructions: "Test how feedback loops can store a bit of memory. Use the Set and Reset buttons.",
		goals: [
			{ id: "test_set", text: "Store HIGH state: pulse SET (1) ON then OFF" },
			{ id: "test_reset", text: "Reset state: pulse RESET (2) ON then OFF" }
		],
		check: function(state) {
			if (!state.visited) {
				state.visited = { set: false, reset: false };
			}
			var setBtn = Circuit.findById(0);
			var resetBtn = Circuit.findById(1);
			var qLight = Circuit.findById(4);
			if (!setBtn || !resetBtn || !qLight) return { test_set: false, test_reset: false };

			if (!setBtn.has_power && qLight.has_power) {
				state.visited.set = true;
			}
			if (state.visited.set && !resetBtn.has_power && !qLight.has_power) {
				state.visited.reset = true;
			}

			return {
				test_set: state.visited.set,
				test_reset: state.visited.reset
			};
		}
	}
];

var currentLessonIdx = 0;
var lessonState = {}; // holds temporary state (like visited flags) for the current active lesson
var checkerInterval = null;
var learnBtn = null;
var learnPanel = null;
var learnTOC = null;
var learnContent = null;
var backBtn = null;
var resetBtn = null;
var nextBtn = null;
var learnProgress = null;

// Initialize tutorials module on DOM ready
document.addEventListener('DOMContentLoaded', function() {
	initTutorials();
	initKeyboardShortcuts();
});

function initTutorials() {
	learnBtn = document.getElementById('learnBtn');
	learnPanel = document.getElementById('learnPanel');
	learnTOC = document.getElementById('learnTOC');
	learnContent = document.getElementById('learnContent');
	backBtn = document.getElementById('learnBackBtn');
	resetBtn = document.getElementById('learnResetBtn');
	nextBtn = document.getElementById('learnNextBtn');
	learnProgress = document.getElementById('learnProgress');

	var isOpen = false;

	// Build TOC options
	TUTORIAL_LESSONS.forEach(function(les, idx) {
		var opt = document.createElement('option');
		opt.value = idx;
		opt.textContent = les.title;
		learnTOC.appendChild(opt);
	});

	learnTOC.addEventListener('change', function(e) {
		var idx = parseInt(e.target.value, 10);
		loadLesson(idx);
	});

	function openPanel() {
		isOpen = true;
		learnPanel.style.display = 'block';
		learnPanel.offsetHeight; // Force reflow
		learnPanel.classList.add('panel-open');
		
		// Close examples panel if open
		var exPanel = document.getElementById('examplesPanel');
		if (exPanel && exPanel.classList.contains('panel-open')) {
			exPanel.classList.remove('panel-open');
			setTimeout(function() {
				exPanel.style.display = 'none';
			}, 300);
		}
		
		loadLesson(currentLessonIdx);
	}

	function closePanel() {
		isOpen = false;
		learnPanel.classList.remove('panel-open');
		stopChecker();
		setTimeout(function() {
			if (!isOpen) learnPanel.style.display = 'none';
		}, 300);
	}

	learnBtn.addEventListener('click', function(e) {
		e.stopPropagation();
		if (isOpen) closePanel();
		else openPanel();
	});

	// Close on click outside
	document.addEventListener('click', function(e) {
		if (isOpen && !learnPanel.contains(e.target) && e.target !== learnBtn) {
			closePanel();
		}
	});

	// Button Actions
	backBtn.addEventListener('click', function() {
		if (currentLessonIdx > 0) {
			loadLesson(currentLessonIdx - 1);
		}
	});

	resetBtn.addEventListener('click', function() {
		loadLessonCircuit();
	});

	nextBtn.addEventListener('click', function() {
		if (nextBtn.classList.contains('active-next') && currentLessonIdx < TUTORIAL_LESSONS.length - 1) {
			loadLesson(currentLessonIdx + 1);
		} else if (nextBtn.classList.contains('active-next') && currentLessonIdx === TUTORIAL_LESSONS.length - 1) {
			// Finished all!
			alert("⚡ Congratulations! You completed all the logic gate tutorials!");
			closePanel();
		}
	});
}

function loadLesson(idx) {
	stopChecker();
	currentLessonIdx = idx;
	learnTOC.value = idx;
	lessonState = { visited: null }; // clear lesson state

	var lesson = TUTORIAL_LESSONS[idx];

	// Update back button state
	backBtn.disabled = idx === 0;

	// Render progress bar
	var percent = ((idx + 1) / TUTORIAL_LESSONS.length) * 100;
	learnProgress.style.width = percent + '%';

	// Reset next button
	nextBtn.classList.remove('active-next');
	nextBtn.disabled = true;
	if (idx === TUTORIAL_LESSONS.length - 1) {
		nextBtn.textContent = "Finish 🏆";
	} else {
		nextBtn.textContent = "Next ➔";
	}

	if (lesson.type === 'theory') {
		// Render Theory Slide
		resetBtn.style.display = 'none';
		learnContent.innerHTML = `
			<div class="slide-theory">
				${lesson.content}
			</div>
		`;
		
		// Theory slides are unlocked by default
		nextBtn.classList.add('active-next');
		nextBtn.disabled = false;
	} else {
		// Render Lab Slide
		resetBtn.style.display = 'inline-block';
		
		var checklistHTML = lesson.goals.map(function(g) {
			return `
				<div class="goal-item" id="goal-${g.id}">
					<div class="checkbox"></div>
					<div class="goal-text">${g.text}</div>
				</div>
			`;
		}).join('');

		learnContent.innerHTML = `
			<div class="slide-lab">
				<p class="instructions-text">${lesson.instructions}</p>
				<div class="goals-checklist">
					${checklistHTML}
				</div>
			</div>
		`;

		// Load start layout
		loadLessonCircuit();
		
		// Start checking logic
		startChecker();
	}
}

function loadLessonCircuit() {
	var lesson = TUTORIAL_LESSONS[currentLessonIdx];
	if (lesson.setupData && typeof loadExample === 'function') {
		loadExample(lesson.setupData);
		if (typeof updateShortcuts === 'function') {
			updateShortcuts();
		}
		lessonState = { visited: null }; // Reset state variables
	}
}

function startChecker() {
	stopChecker();
	checkerInterval = setInterval(function() {
		var lesson = TUTORIAL_LESSONS[currentLessonIdx];
		if (!lesson || lesson.type !== 'lab' || !lesson.check) return;

		var results = lesson.check(lessonState);
		var allDone = true;

		lesson.goals.forEach(function(g) {
			var done = !!results[g.id];
			var el = document.getElementById('goal-' + g.id);
			if (el) {
				if (done) {
					el.classList.add('completed');
				} else {
					el.classList.remove('completed');
					allDone = false;
				}
			} else {
				allDone = false;
			}
		});

		if (allDone && !nextBtn.classList.contains('active-next')) {
			nextBtn.classList.add('active-next');
			nextBtn.disabled = false;
			
			// Play success particles burst in the center of the screen
			triggerSuccessParticles();
		}
	}, 150);
}

function stopChecker() {
	if (checkerInterval) {
		clearInterval(checkerInterval);
		checkerInterval = null;
	}
}

function triggerSuccessParticles() {
	if (typeof spawnParticles !== 'function' || typeof app === 'undefined') return;
	var cx = window.innerWidth / 2;
	var cy = window.innerHeight / 2;
	for (var i = 0; i < 6; i++) {
		(function(idx) {
			setTimeout(function() {
				spawnParticles(
					cx + (Math.random() - 0.5) * 150, 
					cy + (Math.random() - 0.5) * 150, 
					true
				);
			}, idx * 120);
		})(i);
	}
}

// ─── KEYBOARD SHORTCUTS INTEGRATION ───────────────────────────────

function initKeyboardShortcuts() {
	window.addEventListener('keydown', function(e) {
		// Ignore keys if user is typing in form inputs
		if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
			return;
		}

		var key = e.key;
		if (key >= '1' && key <= '9' && typeof Circuit !== 'undefined' && Circuit.active) {
			var buttons = Circuit.active.filter(function(c) {
				return c.type === 'button' && c.shortcutKey === key;
			});
			if (buttons.length > 0) {
				var btn = buttons[0];
				if (btn.data.is_toggle) {
					// Toggle button mode
					btn.has_power = !btn.has_power;
				} else {
					// Momentary button mode: set HIGH if not already HIGH (handles repeat signals)
					if (!btn.has_power) {
						btn.has_power = true;
					}
				}
				if (btn.powerChanged) btn.powerChanged();
				btn.broadcastPower();
			}
		}
	});

	window.addEventListener('keyup', function(e) {
		var key = e.key;
		if (key >= '1' && key <= '9' && typeof Circuit !== 'undefined' && Circuit.active) {
			var buttons = Circuit.active.filter(function(c) {
				return c.type === 'button' && c.shortcutKey === key;
			});
			if (buttons.length > 0) {
				var btn = buttons[0];
				if (!btn.data.is_toggle) {
					// Momentary mode: turn OFF on keyup
					btn.has_power = false;
					if (btn.powerChanged) btn.powerChanged();
					btn.broadcastPower();
				}
			}
		}
	});
}
