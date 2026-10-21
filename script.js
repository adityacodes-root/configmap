/**
 * Config Map — AWS Cloud Architecture Audit Challenge
 * Game Engine & Interactive Diagram Controller
 */

(function () {
  'use strict';

  // Game Configuration & State
  const TOTAL_ROUNDS = 10;
  const MASTER_TIMER_MS = 180 * 1000; // 3:00 station cap
  const POINTS_PER_COMPONENT = 10;
  const MAX_ROUND_SCORE = 30;
  const MAX_TOTAL_SCORE = TOTAL_ROUNDS * MAX_ROUND_SCORE; // 300

  let gameState = {
    isActive: false,
    currentRoundIndex: 0,
    totalScore: 0,
    startTime: 0,
    roundStartTime: 0,
    elapsedMs: 0,
    timerInterval: null,
    selectedServiceIds: [], // max 3
    roundLogs: [],
    zoomLevel: 1.0,
    diffMode: false,
    autoAdvanceTimer: null,
    autoAdvanceSeconds: 3
  };

  // DOM Elements
  const dom = {
    timerDisplay: document.getElementById('timer-display'),
    timerProgressFill: document.getElementById('timer-progress-fill'),
    timerCard: document.getElementById('hud-timer-card'),
    scoreDisplay: document.getElementById('score-display'),
    currentRoundNum: document.getElementById('current-round-num'),
    roundTracker: document.getElementById('round-tracker'),
    
    bannerRoundTag: document.getElementById('banner-round-tag'),
    bannerCategory: document.getElementById('banner-category'),
    bannerTitle: document.getElementById('banner-title'),
    bannerDesc: document.getElementById('banner-desc'),

    canvasReference: document.getElementById('canvas-reference'),
    canvasIncomplete: document.getElementById('canvas-incomplete'),
    boardsContainer: document.getElementById('boards-container'),

    slots: [
      document.getElementById('slot-0'),
      document.getElementById('slot-1'),
      document.getElementById('slot-2')
    ],
    selectedCount: document.getElementById('selected-count'),
    slotCounter: document.getElementById('slot-counter'),
    serviceSearchInput: document.getElementById('service-search-input'),
    searchClearBtn: document.getElementById('search-clear-btn'),
    autocompleteDropdown: document.getElementById('autocomplete-dropdown'),
    serviceChipBank: document.getElementById('service-chip-bank'),
    btnClearSlots: document.getElementById('btn-clear-slots'),
    btnSubmitAudit: document.getElementById('btn-submit-audit'),

    // Modals
    modalIntro: document.getElementById('modal-intro'),
    modalRules: document.getElementById('modal-rules'),
    modalRoundEval: document.getElementById('modal-round-eval'),
    modalGameOver: document.getElementById('modal-gameover'),

    // Action buttons
    btnStartGame: document.getElementById('btn-start-game'),
    btnIntroRules: document.getElementById('btn-intro-rules'),
    btnCloseRules: document.getElementById('btn-close-rules'),
    btnRulesBack: document.getElementById('btn-rules-back'),
    btnRules: document.getElementById('btn-rules'),
    btnSound: document.getElementById('btn-sound'),
    iconSoundOn: document.getElementById('icon-sound-on'),
    iconSoundOff: document.getElementById('icon-sound-off'),
    btnFullscreen: document.getElementById('btn-fullscreen'),
    btnRestart: document.getElementById('btn-restart'),
    btnNextRound: document.getElementById('btn-next-round'),
    autoAdvanceTimerSpan: document.getElementById('auto-advance-timer'),

    // Views & Zooms
    btnViewSide: document.getElementById('btn-view-side'),
    btnDiffMode: document.getElementById('btn-diff-mode'),
    btnZoomIn: document.getElementById('btn-zoom-in'),
    btnZoomReset: document.getElementById('btn-zoom-reset'),
    btnZoomOut: document.getElementById('btn-zoom-out'),

    // Evaluation modal components
    evalRoundBadge: document.getElementById('eval-round-badge'),
    evalTitle: document.getElementById('eval-title'),
    evalPoints: document.getElementById('eval-points'),
    evalScoreBanner: document.getElementById('eval-score-banner'),
    evalItemsList: document.getElementById('eval-items-list'),

    // Game Over modal components
    finalScoreVal: document.getElementById('final-score-val'),
    finalAccuracyVal: document.getElementById('final-accuracy-val'),
    finalTimeVal: document.getElementById('final-time-val'),
    finalDetectedRatio: document.getElementById('final-detected-ratio'),
    gameoverRankTitle: document.getElementById('gameover-rank-title'),
    gameoverRankIcon: document.getElementById('gameover-rank-icon'),
    gameoverTableBody: document.getElementById('gameover-table-body'),
    btnCopyScore: document.getElementById('btn-copy-score'),
    copyBtnText: document.getElementById('copy-btn-text'),
    btnPlayAgain: document.getElementById('btn-play-again')
  };

  // Helper: Format milliseconds into MM:SS.ms
  function formatTime(ms, includeMs = true) {
    if (ms < 0) ms = 0;
    const totalSecs = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSecs / 60);
    const seconds = totalSecs % 60;
    const hundredths = Math.floor((ms % 1000) / 10);

    const pad = (n) => String(n).padStart(2, '0');
    if (includeMs) {
      return `${pad(minutes)}:${pad(seconds)}<span class="timer-ms">.${pad(hundredths)}</span>`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  }

  function formatTimePlain(ms) {
    if (ms < 0) ms = 0;
    const totalSecs = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSecs / 60);
    const seconds = totalSecs % 60;
    const hundredths = Math.floor((ms % 1000) / 10);
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(minutes)}:${pad(seconds)}.${pad(hundredths)}`;
  }

  // Initialize Round Tracker Pills
  function initRoundTracker() {
    dom.roundTracker.innerHTML = '';
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      const step = document.createElement('div');
      step.className = `round-step ${i === 0 ? 'active' : ''}`;
      step.id = `round-step-${i}`;
      step.innerHTML = `
        <span class="round-step-dot"></span>
        <span>A${String(i + 1).padStart(2, '0')}</span>
      `;
      dom.roundTracker.appendChild(step);
    }
  }

  // Update Tracker status
  function updateRoundTracker(roundIdx, statusClass) {
    const step = document.getElementById(`round-step-${roundIdx}`);
    if (step) {
      step.className = `round-step ${statusClass}`;
    }
  }

  // Build SVG Architecture Diagram
  function renderArchitectureSVG(archData, isIncomplete = false) {
    const viewBoxW = 940;
    const viewBoxH = 490;
    const missingSet = new Set(archData.missing);

    // Containers (VPC, Subnets, Tiers)
    const containersSvg = archData.containers.map(c => `
      <g class="arch-container-group">
        <rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="12"
              fill="${c.color}" stroke="${c.border}" class="arch-container-box" />
        <rect x="${c.x + 14}" y="${c.y + 12}" width="${Math.min(c.w - 28, 200)}" height="22" rx="4"
              fill="rgba(0,0,0,0.4)" />
        <text x="${c.x + 20}" y="${c.y + 27}" fill="${c.border}" class="arch-container-label">${c.label}</text>
      </g>
    `).join('');

    // Connections (Arrows & Data Flow)
    const nodeMap = new Map();
    archData.nodes.forEach(n => nodeMap.set(n.id, n));

    const connectionsSvg = archData.connections.map(conn => {
      const fromNode = nodeMap.get(conn.from);
      const toNode = nodeMap.get(conn.to);
      if (!fromNode || !toNode) return '';

      // Center coords
      const x1 = fromNode.x + fromNode.w / 2;
      const y1 = fromNode.y + fromNode.h / 2;
      const x2 = toNode.x + toNode.w / 2;
      const y2 = toNode.y + toNode.h / 2;

      // Check if this connection touches a missing component in incomplete diagram
      const isMissingTouch = isIncomplete && (missingSet.has(conn.from) || missingSet.has(conn.to));

      // Calculate path (smooth cubic curve or orthogonal)
      const dx = x2 - x1;
      const dy = y2 - y1;
      const cx1 = x1 + dx * 0.45;
      const cy1 = y1;
      const cx2 = x1 + dx * 0.55;
      const cy2 = y2;
      const pathD = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

      // Midpoint for label
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;

      if (isMissingTouch) {
        // Render severed / severed dashed flow
        return `
          <g class="arch-conn-group severed">
            <path d="${pathD}" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1.8" stroke-dasharray="4 4" fill="none" />
            <circle cx="${x1 + dx * 0.5}" cy="${y1 + dy * 0.5}" r="3" fill="#ef4444" opacity="0.6" />
          </g>
        `;
      }

      return `
        <g class="arch-conn-group">
          <path d="${pathD}" class="arch-conn-path" />
          <path d="${pathD}" class="arch-conn-flow" />
          ${conn.label ? `
            <rect x="${midX - 38}" y="${midY - 9}" width="76" height="18" class="arch-conn-label-bg" />
            <text x="${midX}" y="${midY + 3}" class="arch-conn-label">${conn.label}</text>
          ` : ''}
        </g>
      `;
    }).join('');

    // Nodes
    const nodesSvg = archData.nodes.map(node => {
      const isMissing = missingSet.has(node.id);

      // In incomplete view, missing components render as GHOST SLOTS
      if (isIncomplete && isMissing) {
        return `
          <g class="ghost-slot-group" data-node-id="${node.id}" data-service="${node.service}" transform="translate(${node.x}, ${node.y})">
            <!-- Ghost dashed card -->
            <rect width="${node.w}" height="${node.h}" class="ghost-slot-rect" />
            <!-- Radar pulsing wave -->
            <circle cx="${node.w / 2}" cy="${node.h / 2}" class="ghost-slot-pulse" fill="none" stroke="#ef4444" stroke-width="1.5" />
            
            <circle cx="${node.w / 2}" cy="${node.h / 2 - 8}" r="14" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="1.5" />
            <text x="${node.w / 2}" y="${node.h / 2}" class="ghost-slot-icon-q">?</text>
            <text x="${node.w / 2}" y="${node.h / 2 + 20}" class="ghost-slot-text">MISSING COMPONENT</text>
          </g>
        `;
      }

      // Regular present node
      const isSelected = gameState.selectedServiceIds.includes(node.service);
      const iconSvg = window.AWS_ICONS[node.service] || window.AWS_ICONS.missing;
      const isDiffTarget = gameState.diffMode && isMissing;

      return `
        <g class="arch-node-group ${isSelected ? 'is-selected' : ''} ${isDiffTarget ? 'diff-highlight' : ''}" 
           data-node-id="${node.id}" data-service="${node.service}" 
           transform="translate(${node.x}, ${node.y})">
          
          <!-- Base Card -->
          <rect width="${node.w}" height="${node.h}" class="arch-node-card" />
          
          <!-- Selected check badge -->
          <g class="arch-node-selected-badge" transform="translate(${node.w - 18}, -6)">
            <circle cx="10" cy="10" r="10" fill="#10B981" />
            <path d="M6 10L9 13L14 7" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
          </g>

          <!-- AWS Service Icon -->
          <g transform="translate(12, 10)">
            <foreignObject width="46" height="46">
              <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;">
                ${iconSvg}
              </div>
            </foreignObject>
          </g>

          <!-- Labels -->
          <text x="68" y="28" class="arch-node-label">${node.label}</text>
          <text x="68" y="44" class="arch-node-sub">${node.sub || ''}</text>
        </g>
      `;
    }).join('');

    return `
      <svg viewBox="0 0 ${viewBoxW} ${viewBoxH}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="arch-grid-${isIncomplete ? 'inc' : 'ref'}" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" class="arch-grid-line" />
          </pattern>
        </defs>
        
        <!-- Grid pattern background -->
        <rect width="100%" height="100%" fill="url(#arch-grid-${isIncomplete ? 'inc' : 'ref'})" />

        <!-- Containers -->
        ${containersSvg}

        <!-- Connections -->
        ${connectionsSvg}

        <!-- Nodes -->
        ${nodesSvg}
      </svg>
    `;
  }

  // Load and Render Current Architecture
  function loadCurrentArchitecture() {
    const arch = window.CONFIG_MAP_DIAGRAMS[gameState.currentRoundIndex];
    if (!arch) return;

    // Update banner metadata
    dom.bannerRoundTag.textContent = `ARCH ${String(gameState.currentRoundIndex + 1).padStart(2, '0')} / 10`;
    dom.currentRoundNum.textContent = gameState.currentRoundIndex + 1;
    dom.bannerTitle.textContent = arch.title;
    dom.bannerDesc.textContent = arch.scenario;
    dom.bannerCategory.textContent = arch.subtitle.toUpperCase();

    // Reset round selections
    gameState.selectedServiceIds = [];
    updateSelectedSlots();

    // Render SVGs
    renderBothCanvases();

    // Populate service quick-pick chips
    renderServiceChips(arch);

    // Track round start
    gameState.roundStartTime = Date.now();
  }

  // Render both reference and incomplete canvases
  function renderBothCanvases() {
    const arch = window.CONFIG_MAP_DIAGRAMS[gameState.currentRoundIndex];
    if (!arch) return;

    dom.canvasReference.innerHTML = renderArchitectureSVG(arch, false);
    dom.canvasIncomplete.innerHTML = renderArchitectureSVG(arch, true);

    // Attach click handlers to reference nodes
    const refNodes = dom.canvasReference.querySelectorAll('.arch-node-group');
    refNodes.forEach(nodeEl => {
      nodeEl.addEventListener('click', () => {
        const service = nodeEl.getAttribute('data-service');
        toggleServiceSelection(service);
      });
    });

    // Attach click handlers to incomplete ghost slots
    const ghostSlots = dom.canvasIncomplete.querySelectorAll('.ghost-slot-group');
    ghostSlots.forEach(slotEl => {
      slotEl.addEventListener('click', () => {
        const service = slotEl.getAttribute('data-service');
        window.soundFx.click();
        // Focus search input and pre-fill or suggest
        dom.serviceSearchInput.focus();
        dom.serviceSearchInput.placeholder = "Detected ghost slot! Type or select missing AWS service...";
      });
    });
  }

  // Render Service Quick-Pick Chips
  function renderServiceChips(arch) {
    dom.serviceChipBank.innerHTML = '';

    // Collect all unique services present in this architecture
    const servicesInArch = [...new Set(arch.nodes.map(n => n.service))];
    
    // Sort so missing items aren't obvious (alphabetical order)
    servicesInArch.sort();

    servicesInArch.forEach(svcId => {
      const meta = window.AWS_SERVICE_NAMES[svcId] || { name: svcId, abbr: svcId };
      const isSelected = gameState.selectedServiceIds.includes(svcId);
      const iconSvg = window.AWS_ICONS[svcId] || window.AWS_ICONS.missing;

      const chip = document.createElement('button');
      chip.className = `service-chip ${isSelected ? 'selected' : ''}`;
      chip.setAttribute('data-service', svcId);
      chip.innerHTML = `
        <span class="service-chip-icon">${iconSvg}</span>
        <span>${meta.abbr || meta.name}</span>
      `;

      chip.addEventListener('click', () => {
        toggleServiceSelection(svcId);
      });

      dom.serviceChipBank.appendChild(chip);
    });
  }

  // Toggle selection of a service
  function toggleServiceSelection(serviceId) {
    const index = gameState.selectedServiceIds.indexOf(serviceId);
    if (index > -1) {
      // Remove
      gameState.selectedServiceIds.splice(index, 1);
      window.soundFx.deselect();
    } else {
      // Add if < 3
      if (gameState.selectedServiceIds.length >= 3) {
        window.soundFx.warning();
        // Shake slots
        dom.slots.forEach(s => s.classList.add('shake'));
        setTimeout(() => dom.slots.forEach(s => s.classList.remove('shake')), 300);
        return;
      }
      gameState.selectedServiceIds.push(serviceId);
      window.soundFx.select();
    }

    updateSelectedSlots();
    renderBothCanvases();
    updateChipStates();
  }

  // Update Service Chip Selected Highlights
  function updateChipStates() {
    const chips = dom.serviceChipBank.querySelectorAll('.service-chip');
    chips.forEach(chip => {
      const svc = chip.getAttribute('data-service');
      if (gameState.selectedServiceIds.includes(svc)) {
        chip.classList.add('selected');
      } else {
        chip.classList.remove('selected');
      }
    });
  }

  // Update 3 Slot Holders in Submission Dock
  function updateSelectedSlots() {
    const count = gameState.selectedServiceIds.length;
    dom.selectedCount.textContent = count;

    for (let i = 0; i < 3; i++) {
      const slotEl = dom.slots[i];
      const serviceId = gameState.selectedServiceIds[i];

      if (serviceId) {
        const meta = window.AWS_SERVICE_NAMES[serviceId] || { name: serviceId, category: 'AWS Service' };
        const iconSvg = window.AWS_ICONS[serviceId] || window.AWS_ICONS.missing;

        slotEl.className = 'component-slot filled';
        slotEl.innerHTML = `
          <span class="slot-number">${i + 1}</span>
          <div class="slot-icon-wrap">${iconSvg}</div>
          <div class="slot-name-wrap">
            <span class="slot-service-name">${meta.name}</span>
            <span class="slot-service-cat">${meta.category}</span>
          </div>
          <button class="slot-clear-btn" data-slot-index="${i}" aria-label="Clear slot">&times;</button>
        `;

        const clearBtn = slotEl.querySelector('.slot-clear-btn');
        clearBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleServiceSelection(serviceId);
        });
      } else {
        slotEl.className = 'component-slot empty';
        slotEl.innerHTML = `
          <span class="slot-number">${i + 1}</span>
          <span class="slot-placeholder">Select missing component ${i + 1}...</span>
          <button class="slot-clear-btn" aria-label="Clear slot">&times;</button>
        `;
      }
    }

    // Submit button state
    if (count > 0) {
      dom.btnSubmitAudit.disabled = false;
      dom.btnSubmitAudit.querySelector('.btn-text').textContent = `SUBMIT AUDIT (${count}/3)`;
    } else {
      dom.btnSubmitAudit.disabled = true;
      dom.btnSubmitAudit.querySelector('.btn-text').textContent = `SUBMIT AUDIT (0/3)`;
    }
  }

  // Autocomplete & Search Input Handler
  function initAutocomplete() {
    const input = dom.serviceSearchInput;
    const dropdown = dom.autocompleteDropdown;
    const clearBtn = dom.searchClearBtn;

    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      if (!query) {
        dropdown.classList.add('hidden');
        clearBtn.classList.remove('active');
        return;
      }

      clearBtn.classList.add('active');

      // Filter from all known AWS services
      const matches = Object.entries(window.AWS_SERVICE_NAMES).filter(([id, svc]) => {
        return (
          id.toLowerCase().includes(query) ||
          svc.name.toLowerCase().includes(query) ||
          svc.abbr.toLowerCase().includes(query) ||
          svc.category.toLowerCase().includes(query)
        );
      });

      if (matches.length === 0) {
        dropdown.innerHTML = `<div class="autocomplete-item"><span class="autocomplete-meta">No matching AWS service found</span></div>`;
        dropdown.classList.remove('hidden');
        return;
      }

      dropdown.innerHTML = matches.slice(0, 7).map(([id, svc]) => {
        const iconSvg = window.AWS_ICONS[id] || window.AWS_ICONS.missing;
        return `
          <div class="autocomplete-item" data-service="${id}">
            <div class="autocomplete-icon">${iconSvg}</div>
            <div class="autocomplete-info">
              <span class="autocomplete-name">${svc.name} (${svc.abbr})</span>
              <span class="autocomplete-meta">${svc.category}</span>
            </div>
          </div>
        `;
      }).join('');

      dropdown.classList.remove('hidden');

      // Attach click to options
      dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
        item.addEventListener('click', () => {
          const svcId = item.getAttribute('data-service');
          if (svcId) {
            toggleServiceSelection(svcId);
            input.value = '';
            dropdown.classList.add('hidden');
            clearBtn.classList.remove('active');
          }
        });
      });
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      dropdown.classList.add('hidden');
      clearBtn.classList.remove('active');
      input.focus();
    });

    // Close autocomplete on click outside
    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });

    // Enter in search to select top result or submit
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const firstMatch = dropdown.querySelector('.autocomplete-item[data-service]');
        if (firstMatch && !dropdown.classList.contains('hidden')) {
          firstMatch.click();
        } else if (gameState.selectedServiceIds.length > 0) {
          submitCurrentRoundAudit();
        }
      }
    });
  }

  // Clear all 3 slots
  dom.btnClearSlots.addEventListener('click', () => {
    gameState.selectedServiceIds = [];
    window.soundFx.deselect();
    updateSelectedSlots();
    renderBothCanvases();
    updateChipStates();
  });

  // Submit Audit Evaluation
  function submitCurrentRoundAudit() {
    if (!gameState.isActive) return;

    const arch = window.CONFIG_MAP_DIAGRAMS[gameState.currentRoundIndex];
    if (!arch) return;

    const roundElapsedMs = Date.now() - gameState.roundStartTime;
    const missingActual = arch.missing; // 3 actual missing IDs
    const submitted = gameState.selectedServiceIds;

    // Check which ones are correct
    let roundPoints = 0;
    const correctIdentified = [];
    const missedComponents = [];

    missingActual.forEach(actualId => {
      if (submitted.includes(actualId)) {
        roundPoints += POINTS_PER_COMPONENT;
        correctIdentified.push(actualId);
      } else {
        missedComponents.push(actualId);
      }
    });

    // Update Score
    gameState.totalScore += roundPoints;
    dom.scoreDisplay.textContent = gameState.totalScore;

    // Sound FX
    if (roundPoints === MAX_ROUND_SCORE) {
      window.soundFx.correct();
      updateRoundTracker(gameState.currentRoundIndex, 'cleared-perfect');
    } else if (roundPoints > 0) {
      window.soundFx.correct();
      updateRoundTracker(gameState.currentRoundIndex, 'cleared-partial');
    } else {
      window.soundFx.warning();
      updateRoundTracker(gameState.currentRoundIndex, 'cleared-missed');
    }

    // Save round log for final table
    gameState.roundLogs.push({
      round: gameState.currentRoundIndex + 1,
      title: arch.title,
      score: roundPoints,
      correct: correctIdentified,
      missed: missedComponents,
      elapsedStr: `${(roundElapsedMs / 1000).toFixed(1)}s`
    });

    // Display Round Evaluation Modal
    showRoundEvaluation(roundPoints, arch, correctIdentified, missedComponents);
  }

  // Display Round Evaluation Modal
  function showRoundEvaluation(points, arch, correct, missed) {
    dom.evalRoundBadge.textContent = `ROUND ${gameState.currentRoundIndex + 1} OF 10`;
    dom.evalPoints.textContent = `+${points}`;

    if (points === MAX_ROUND_SCORE) {
      dom.evalScoreBanner.className = 'eval-score-banner';
      dom.evalTitle.textContent = 'Flawless Architecture Audit!';
    } else if (points > 0) {
      dom.evalScoreBanner.className = 'eval-score-banner partial';
      dom.evalTitle.textContent = 'Partial Components Identified';
    } else {
      dom.evalScoreBanner.className = 'eval-score-banner missed';
      dom.evalTitle.textContent = 'Missing Components Undetected';
    }

    // Breakdown list of all 3 missing items
    dom.evalItemsList.innerHTML = arch.missing.map(svcId => {
      const isFound = correct.includes(svcId);
      const meta = window.AWS_SERVICE_NAMES[svcId] || { name: svcId, category: 'AWS Service' };
      const iconSvg = window.AWS_ICONS[svcId] || window.AWS_ICONS.missing;
      const reason = arch.reasons[svcId] || "Critical component required for architecture operation.";

      return `
        <div class="eval-item-card ${isFound ? 'is-correct' : 'is-missed'}">
          <div class="eval-item-icon">${iconSvg}</div>
          <div class="eval-item-details">
            <div class="eval-item-top">
              <span class="eval-item-name">${meta.name}</span>
              <span class="eval-item-badge ${isFound ? 'correct' : 'missed'}">
                ${isFound ? 'DETECTED (+10 PTS)' : 'MISSED (0 PTS)'}
              </span>
            </div>
            <p class="eval-item-reason">${reason}</p>
          </div>
        </div>
      `;
    }).join('');

    // Auto-advance countdown
    gameState.autoAdvanceSeconds = 4;
    dom.autoAdvanceTimerSpan.textContent = gameState.autoAdvanceSeconds;
    
    clearInterval(gameState.autoAdvanceTimer);
    gameState.autoAdvanceTimer = setInterval(() => {
      gameState.autoAdvanceSeconds--;
      dom.autoAdvanceTimerSpan.textContent = gameState.autoAdvanceSeconds;
      if (gameState.autoAdvanceSeconds <= 0) {
        clearInterval(gameState.autoAdvanceTimer);
        proceedToNextRound();
      }
    }, 1000);

    dom.modalRoundEval.classList.add('active');
    dom.modalRoundEval.classList.remove('hidden');
  }

  // Proceed to next round or finish match
  function proceedToNextRound() {
    clearInterval(gameState.autoAdvanceTimer);
    dom.modalRoundEval.classList.remove('active');
    dom.modalRoundEval.classList.add('hidden');

    gameState.currentRoundIndex++;
    if (gameState.currentRoundIndex >= TOTAL_ROUNDS) {
      finishGame(false);
    } else {
      loadCurrentArchitecture();
      // Set active dot on tracker
      const step = document.getElementById(`round-step-${gameState.currentRoundIndex}`);
      if (step) step.classList.add('active');
    }
  }

  dom.btnNextRound.addEventListener('click', () => {
    window.soundFx.click();
    proceedToNextRound();
  });

  dom.btnSubmitAudit.addEventListener('click', () => {
    submitCurrentRoundAudit();
  });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (!gameState.isActive) return;

    // Enter to submit
    if (e.key === 'Enter') {
      if (dom.modalRoundEval.classList.contains('active')) {
        dom.btnNextRound.click();
      } else if (gameState.selectedServiceIds.length > 0 && !dom.serviceSearchInput.matches(':focus')) {
        submitCurrentRoundAudit();
      }
    }

    // Escape to clear or close modal
    if (e.key === 'Escape') {
      if (dom.modalRules.classList.contains('active')) {
        dom.btnCloseRules.click();
      } else if (gameState.selectedServiceIds.length > 0) {
        dom.btnClearSlots.click();
      }
    }
  });

  // Master Station Clock (3:00 cap)
  function startMasterTimer() {
    clearInterval(gameState.timerInterval);
    gameState.startTime = Date.now();

    gameState.timerInterval = setInterval(() => {
      const now = Date.now();
      gameState.elapsedMs = now - gameState.startTime;
      const remainingMs = Math.max(0, MASTER_TIMER_MS - gameState.elapsedMs);

      // Render clock
      dom.timerDisplay.innerHTML = formatTime(remainingMs);

      // Progress bar fill
      const pct = (remainingMs / MASTER_TIMER_MS) * 100;
      dom.timerProgressFill.style.width = `${pct}%`;

      // Visual warning triggers
      if (remainingMs <= 30000) {
        dom.timerCard.className = 'hud-timer-card danger';
        // Tick sound on every full second
        if (Math.floor(remainingMs / 1000) !== Math.floor((remainingMs + 30) / 1000)) {
          window.soundFx.tick();
        }
      } else if (remainingMs <= 60000) {
        dom.timerCard.className = 'hud-timer-card warning';
      } else {
        dom.timerCard.className = 'hud-timer-card';
      }

      // Check for timeout
      if (remainingMs <= 0) {
        clearInterval(gameState.timerInterval);
        handleTimeout();
      }
    }, 25);
  }

  // Handle Station Timer Timeout
  function handleTimeout() {
    window.soundFx.warning();
    // Auto submit any selections if mid-round
    if (gameState.currentRoundIndex < TOTAL_ROUNDS) {
      const arch = window.CONFIG_MAP_DIAGRAMS[gameState.currentRoundIndex];
      if (arch) {
        let roundPoints = 0;
        const correct = [];
        const missed = [];
        arch.missing.forEach(id => {
          if (gameState.selectedServiceIds.includes(id)) {
            roundPoints += POINTS_PER_COMPONENT;
            correct.push(id);
          } else {
            missed.push(id);
          }
        });
        gameState.totalScore += roundPoints;
        gameState.roundLogs.push({
          round: gameState.currentRoundIndex + 1,
          title: arch.title,
          score: roundPoints,
          correct,
          missed,
          elapsedStr: 'TIMEOUT'
        });
      }
    }
    finishGame(true);
  }

  // Finish Game & Show Final Scorecard
  function finishGame(isTimeout = false) {
    gameState.isActive = false;
    clearInterval(gameState.timerInterval);
    clearInterval(gameState.autoAdvanceTimer);

    window.soundFx.fanfare();

    // Close any open round eval modal
    dom.modalRoundEval.classList.remove('active');
    dom.modalRoundEval.classList.add('hidden');

    // Populate scorecard
    dom.finalScoreVal.textContent = gameState.totalScore;
    const accuracy = ((gameState.totalScore / MAX_TOTAL_SCORE) * 100).toFixed(1);
    dom.finalAccuracyVal.textContent = `${accuracy}% Component Accuracy`;

    const totalDetected = Math.round(gameState.totalScore / POINTS_PER_COMPONENT);
    dom.finalDetectedRatio.textContent = `${totalDetected} / 30`;

    // Tie-breaker elapsed time
    const finalElapsedStr = formatTimePlain(Math.min(gameState.elapsedMs, MASTER_TIMER_MS));
    dom.finalTimeVal.textContent = finalElapsedStr;

    // Rank calculation
    let rank = "Cloud Practitioner in Training";
    let icon = "🌱";
    if (gameState.totalScore >= 280) {
      rank = "🏆 Principal Cloud Enterprise Architect";
      icon = "🏆";
    } else if (gameState.totalScore >= 230) {
      rank = "⚡ Senior Solutions Architect";
      icon = "⚡";
    } else if (gameState.totalScore >= 180) {
      rank = "🛡️ Certified Cloud Observability Auditor";
      icon = "🛡️";
    } else if (gameState.totalScore >= 110) {
      rank = "🔍 Associate Cloud Inspector";
      icon = "🔍";
    }

    dom.gameoverRankTitle.textContent = rank;
    dom.gameoverRankIcon.textContent = icon;

    // Fill 10-round breakdown table
    dom.gameoverTableBody.innerHTML = '';
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      const log = gameState.roundLogs[i];
      const arch = window.CONFIG_MAP_DIAGRAMS[i];
      const tr = document.createElement('tr');

      if (log) {
        let badgeClass = 'full';
        if (log.score === 0) badgeClass = 'zero';
        else if (log.score < MAX_ROUND_SCORE) badgeClass = 'partial';

        tr.innerHTML = `
          <td><strong>#${log.round}</strong></td>
          <td>${log.title}</td>
          <td>${log.correct.length} / 3</td>
          <td><span class="score-badge ${badgeClass}">${log.score} pts</span></td>
          <td>${log.elapsedStr}</td>
        `;
      } else {
        tr.innerHTML = `
          <td><strong>#${i + 1}</strong></td>
          <td>${arch ? arch.title : `Architecture ${i + 1}`}</td>
          <td>0 / 3</td>
          <td><span class="score-badge zero">0 pts</span></td>
          <td>Unattempted</td>
        `;
      }
      dom.gameoverTableBody.appendChild(tr);
    }

    // Show Game Over modal
    dom.modalGameOver.classList.add('active');
    dom.modalGameOver.classList.remove('hidden');
  }

  // Copy Official Tournament Score Report
  dom.btnCopyScore.addEventListener('click', () => {
    const accuracy = ((gameState.totalScore / MAX_TOTAL_SCORE) * 100).toFixed(1);
    const finalElapsedStr = formatTimePlain(Math.min(gameState.elapsedMs, MASTER_TIMER_MS));

    const report = [
      `================================================`,
      `🗺️ CONFIG MAP — OFFICIAL AWS AUDIT SCORE REPORT`,
      `================================================`,
      `Station Location : Room 327 / 331 (Circuit Track)`,
      `Final Score      : ${gameState.totalScore} / 300 Points`,
      `Accuracy         : ${accuracy}%`,
      `Detected Delta   : ${Math.round(gameState.totalScore / 10)} / 30 Components`,
      `Official Clock   : ${finalElapsedStr} (Station Cap: 03:00.00)`,
      `Auditor Rank     : ${dom.gameoverRankTitle.textContent}`,
      `------------------------------------------------`,
      `Round Log:`,
      ...gameState.roundLogs.map(l => `  • Round ${l.round}: ${l.score}/30 pts (${l.elapsedStr}) - ${l.title}`),
      `================================================`
    ].join('\n');

    navigator.clipboard.writeText(report).then(() => {
      dom.copyBtnText.textContent = "Copied to Clipboard!";
      window.soundFx.click();
      setTimeout(() => {
        dom.copyBtnText.textContent = "Copy Official Score Report";
      }, 2500);
    });
  });

  // Start / Reset Game
  function startNewGame() {
    gameState.isActive = true;
    gameState.currentRoundIndex = 0;
    gameState.totalScore = 0;
    gameState.roundLogs = [];
    gameState.selectedServiceIds = [];

    dom.scoreDisplay.textContent = '0';
    dom.modalIntro.classList.remove('active');
    dom.modalGameOver.classList.remove('active');
    dom.modalGameOver.classList.add('hidden');
    dom.modalRoundEval.classList.remove('active');
    dom.modalRoundEval.classList.add('hidden');

    initRoundTracker();
    loadCurrentArchitecture();
    startMasterTimer();
  }

  dom.btnStartGame.addEventListener('click', () => {
    window.soundFx.click();
    startNewGame();
  });

  dom.btnPlayAgain.addEventListener('click', () => {
    window.soundFx.click();
    startNewGame();
  });

  dom.btnRestart.addEventListener('click', () => {
    if (confirm("Reset current station audit match? All points and timer will reset.")) {
      startNewGame();
    }
  });

  // Rules Modal Controls
  dom.btnRules.addEventListener('click', () => {
    window.soundFx.click();
    dom.modalRules.classList.add('active');
    dom.modalRules.classList.remove('hidden');
  });

  dom.btnIntroRules.addEventListener('click', () => {
    window.soundFx.click();
    dom.modalRules.classList.add('active');
    dom.modalRules.classList.remove('hidden');
  });

  dom.btnCloseRules.addEventListener('click', () => {
    window.soundFx.click();
    dom.modalRules.classList.remove('active');
    dom.modalRules.classList.add('hidden');
  });

  dom.btnRulesBack.addEventListener('click', () => {
    window.soundFx.click();
    dom.modalRules.classList.remove('active');
    dom.modalRules.classList.add('hidden');
  });

  // Sound Toggle
  dom.btnSound.addEventListener('click', () => {
    const isMuted = window.soundFx.toggleMute();
    if (isMuted) {
      dom.iconSoundOn.classList.add('hidden');
      dom.iconSoundOff.classList.remove('hidden');
    } else {
      dom.iconSoundOn.classList.remove('hidden');
      dom.iconSoundOff.classList.add('hidden');
      window.soundFx.click();
    }
  });

  // Sync initial sound state icon
  if (window.soundFx.muted) {
    dom.iconSoundOn.classList.add('hidden');
    dom.iconSoundOff.classList.remove('hidden');
  }

  // Fullscreen Toggle
  dom.btnFullscreen.addEventListener('click', () => {
    window.soundFx.click();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // View Mode Controls (Side-by-Side vs Diff Overlay)
  dom.btnDiffMode.addEventListener('click', () => {
    gameState.diffMode = !gameState.diffMode;
    dom.btnDiffMode.classList.toggle('active', gameState.diffMode);
    dom.boardsContainer.classList.toggle('diff-mode-active', gameState.diffMode);
    window.soundFx.click();
    renderBothCanvases();
  });

  dom.btnViewSide.addEventListener('click', () => {
    gameState.diffMode = false;
    dom.btnDiffMode.classList.remove('active');
    dom.boardsContainer.classList.remove('diff-mode-active');
    dom.btnViewSide.classList.add('active');
    window.soundFx.click();
    renderBothCanvases();
  });

  // Zoom Controls
  function applyZoom() {
    dom.canvasReference.style.transform = `scale(${gameState.zoomLevel})`;
    dom.canvasIncomplete.style.transform = `scale(${gameState.zoomLevel})`;
    dom.btnZoomReset.textContent = `${Math.round(gameState.zoomLevel * 100)}%`;
  }

  dom.btnZoomIn.addEventListener('click', () => {
    if (gameState.zoomLevel < 1.6) {
      gameState.zoomLevel += 0.15;
      applyZoom();
      window.soundFx.click();
    }
  });

  dom.btnZoomOut.addEventListener('click', () => {
    if (gameState.zoomLevel > 0.7) {
      gameState.zoomLevel -= 0.15;
      applyZoom();
      window.soundFx.click();
    }
  });

  dom.btnZoomReset.addEventListener('click', () => {
    gameState.zoomLevel = 1.0;
    applyZoom();
    window.soundFx.click();
  });

  // Initial Setup
  initRoundTracker();
  initAutocomplete();
  loadCurrentArchitecture();

})();
