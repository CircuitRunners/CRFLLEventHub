<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    // --- Types ---
    type MissionType = 'yesNo' | 'step' | 'precision';
  
    interface Mission {
      id: string;
      title: string;
      description: string;
      type: MissionType;
      max?: number;
      state: number | boolean | null;
      bonus?: {
        description: string;
        state: boolean;
      };
    }
  
    // NOTE: Mission Data remains the same as it correctly defines all missions.
    const missions: Mission[] = [
      // Toggle Missions (Yes/No)
      { id: 'M01', title: 'SURFACE BRUSHING', description: 'Small deposits are completely cleared, touching the mat.', type: 'yesNo', state: null },
      { id: 'M02', title: 'MAP REVEAL', description: 'Tap/handle is completely cleared.', type: 'yesNo', state: null },
      { id: 'M04', title: 'CAREFUL RECOVERY', description: 'Previous artifacts are all touching the mat.', type: 'yesNo', state: null, bonus: { description: "Bonus: Put the opposing team's Milestone on your team's Field.", state: false } },
      { id: 'M05', title: 'WHO LIVED HERE?', description: 'Structure floor is completely upright.', type: 'yesNo', state: null },
      { id: 'M06', title: 'FORGE', description: 'Technician may open one lockbox by hand...', type: 'yesNo', state: null },
      { id: 'M07', title: 'HEAVY LIFTING', description: 'Milestone is no longer touching its base.', type: 'yesNo', state: null },
      { id: 'M11', title: 'ARTIFACTS', description: 'Artifacts are visible above the grey layer.', type: 'yesNo', state: null, bonus: { description: "Bonus: Put the crane big lift at least partly downward.", state: false } },
      { id: 'M12', title: 'SALVAGE OPERATION', description: 'Switch is completely cleared...', type: 'yesNo', state: null },
      { id: 'M13', title: 'STATUS REBUILD', description: 'Satellite is completely repaired.', type: 'yesNo', state: null },
      { id: 'M15', title: 'TIP THE SCALES', description: 'Scale is tipped and touching the mat.', type: 'yesNo', state: null },
  
      // Step Missions (0-N)
      { id: 'M08', title: 'SL0', description: 'Previously-down slide is up.', type: 'step', max: 3, state: 0 },
      { id: 'M09', title: 'WHAT\'S ON SALE?', description: 'Box is completely closed.', type: 'step', max: 3, state: 0 },
      { id: 'M10', title: 'TIPPING THE SCALES', description: 'Scale is tipped and touching mat.', type: 'step', max: 3, state: 0 },
      { id: 'M14', title: 'FORUM', description: 'Artifacts touching the mat and at least partly in the forum.', type: 'step', max: 7, state: 0 },
  
      // Precision (Special Case)
      { id: 'P01', title: 'PRECISION TOKENS', description: 'Number of precision tokens remaining.', type: 'precision', max: 6, state: 0 },
    ];
  
    const dispatch = createEventDispatcher();
  
    function updateState(): void {
      dispatch('updateState', missions);
    }
  
    // Ensure state is updated and dispatched whenever 'missions' changes.
    $: missions, updateState(); 
  
    function getSteps(max: number): number[] {
      return Array.from({ length: max + 1 }, (_, i) => i);
    }
  </script>
  
  <div class="p-4 bg-gray-900 min-h-screen text-white font-sans">
    
    <div class="text-center mb-6">
      <h1 class="text-3xl font-extrabold text-teal-400">FLL INTO ORBIT SCORER</h1>
      <p class="text-sm text-gray-400">Mission State Tracker</p>
    </div>
  
    <div class="p-4 mb-6 bg-gray-800 rounded-lg shadow-lg border-l-4 border-red-500">
      <h2 class="text-xl font-bold text-red-500">EQUIPMENT INSPECTION</h2>
      <p class="text-sm text-gray-400">Robot and all equipment completely in one launch area and under the height limit.</p>
      <div class="mt-3 flex justify-center space-x-4">
        <button class="px-6 py-2 rounded-lg text-md font-semibold bg-gray-700 hover:bg-green-500 transition-colors">Yes</button>
        <button class="px-6 py-2 rounded-lg text-md font-semibold bg-gray-700 hover:bg-red-500 transition-colors">No</button>
      </div>
    </div>
  
    <div class="columns-1 sm:columns-2 gap-4 space-y-4">
      {#each missions as mission (mission.id)}
        
        <div class="p-3 bg-gray-800 rounded-lg shadow-md border-b border-gray-700 break-inside-avoid-column">
          
          <h3 class="text-lg font-bold text-yellow-400">{mission.id}: {mission.title}</h3>
          <p class="text-sm text-gray-400 mt-1">{mission.description}</p>
  
          {#if mission.type === 'yesNo'}
            <div class="flex justify-end space-x-2 mt-2">
              <button 
                on:click={() => mission.state = true}
                class="px-4 py-1 rounded-full text-sm font-semibold transition-colors {mission.state === true ? 'bg-green-600' : 'bg-gray-700 hover:bg-green-500'}"
              >Yes</button>
              <button 
                on:click={() => mission.state = false}
                class="px-4 py-1 rounded-full text-sm font-semibold transition-colors {mission.state === false ? 'bg-red-600' : 'bg-gray-700 hover:bg-red-500'}"
              >No</button>
            </div>
            
            {#if mission.bonus}
              <div class="mt-2 p-2 bg-gray-700 rounded-md">
                <label class="text-xs font-semibold text-teal-400 flex items-center">
                  BONUS: {mission.bonus.description}
                  <input type="checkbox" bind:checked={mission.bonus.state} class="ml-auto w-4 h-4 text-teal-600 bg-gray-600 border-gray-500 rounded focus:ring-teal-500">
                </label>
              </div>
            {/if}
            
          {:else if (mission.type === 'step' || mission.type === 'precision') && typeof mission.max === 'number'}
            
            <div class="flex justify-between mt-3 space-x-1">
              {#each getSteps(mission.max) as step}
                <button 
                  on:click={() => mission.state = step}
                  class="flex-1 py-1 rounded-md text-sm font-semibold transition-colors {mission.state === step ? 'bg-blue-600' : 'bg-gray-700 hover:bg-blue-500'}"
                >
                  {step}
                </button>
              {/each}
            </div>
  
            {#if mission.type === 'precision'}
              <div class="flex justify-between text-xs mt-2 font-semibold">
                <span class="{mission.state as number >= 0 ? 'text-white' : 'text-gray-500'}">DEVELOPING</span>
                <span class="{mission.state as number >= 2 && mission.state as number <= 3 ? 'text-white' : 'text-gray-500'}">ACCOMPLISHED</span>
                <span class="{mission.state as number >= 4 ? 'text-white' : 'text-gray-500'}">EXCEEDS</span>
              </div>
            {/if}
  
          {/if}
        </div>
      {/each}
    </div>
  
    <div class="sticky bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-700 mt-6 flex justify-center">
      <button
        on:click={() => { 
          window.location.reload(); 
        }}
        class="p-3 bg-red-600 hover:bg-red-700 text-lg font-semibold rounded-lg shadow-md transition duration-150 ease-in-out active:scale-95"
      >
        ⚠️ RESET ALL
      </button>
    </div>
  </div>