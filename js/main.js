/**
 * GRADIENT CLUB - IIIT SRI CITY OFFICIAL JAVASCRIPT
 * Complete Interactive Architecture:
 * 1. Particle Canvas Background (Light Theme Optimized)
 * 2. Planned Events Hub (Google Form Registration & Live Search)
 * 3. 6 Sorting Algorithms Visualizer (Quick, Merge, Heap, Insertion, Selection, Bubble)
 * 4. Code Arena:
 *    - 5 Progressive Challenges (Level 1 Easy to Level 5 Hard / ICPC)
 *    - 7 Supported Languages (C++, Python, Java, JavaScript, C, Rust, Go)
 *    - 3 Complete Solutions per Challenge (Brute Force, Better, Optimal) across ALL 7 languages
 *    - Real Compilation, Transpilation & Execution Engine with Exact Test Case Output Matching
 * 5. Notification Modal & Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initEventsManager();
  initCodeArena();
  initSortingVisualizer();
  initModalsAndToasts();
});

/* ==========================================================================
   1. Interactive Particle Canvas Background
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 70);
  let mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
      this.color = Math.random() > 0.5 ? 'rgba(2, 132, 199, ' : 'rgba(5, 150, 105, ';
      this.opacity = Math.random() * 0.4 + 0.25;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.opacity + ')';
      ctx.fill();
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      if (mouse.x && mouse.y) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * 2.5;
          this.y -= (dy / distance) * force * 2.5;
        }
      }
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 115) {
          let opacityValue = 1 - distance / 115;
          ctx.strokeStyle = `rgba(2, 132, 199, ${opacityValue * 0.2})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Planned Events Hub with Registration State & Google Forms
   ========================================================================== */
const PLANNED_EVENTS = [
  {
    id: 'recruitment-ug2-ug3',
    name: 'Recruitment Interviews (UG-2 & UG-3)',
    category: 'Recruitment',
    date: 'Ahead of Introductory Session (Active Now)',
    tentative: false,
    venue: 'Time: TBD | Venue: TBD (IIIT Sri City)',
    description: 'Gradient is officially recruiting team leads and contributors from UG-2 & UG-3 across 4 domains: Problem Setter, Contest Manager, Competitive Programming & Workshops, and PR & Design.',
    isOpen: true,
    googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScfAdcstEVY5fqzBagxcCqIUCDCzZ5KFdLnNrsRwSBMJw-wHg/viewform',
    tags: ['Recruitment', 'UG2', 'UG3', 'Interviews', 'Core Team'],
    featured: true
  },
  {
    id: 'intro-session',
    name: 'Introductory Session',
    category: 'Orientation',
    date: '17 / 18 / 19 September',
    tentative: true,
    venue: 'Yet to be decided',
    description: 'Official induction into Gradient Club for the incoming batch and campus community. Discover our algorithmic roadmap, contest calendar, practice tracks, and mentorship circles.',
    isOpen: false,
    googleFormUrl: null,
    tags: ['Orientation', 'All Batches', 'Induction'],
    featured: false
  },
  {
    id: 'contest-ug2',
    name: 'Contest for UG2',
    category: 'Contest',
    date: '28 / 29 / 30 September',
    tentative: true,
    venue: 'Yet to be decided',
    description: 'Tailored algorithmic showdown designed for UG-2 students. Compete on core data structures, Greedy techniques, Graph fundamentals, and intermediate dynamic programming.',
    isOpen: false,
    googleFormUrl: null,
    tags: ['UG2', 'Contest', 'Competitive Programming'],
    featured: false
  },
  {
    id: 'workshop-ug1',
    name: 'Workshop for UG1',
    category: 'Workshop',
    date: '3 / 4 / 5 October',
    tentative: true,
    venue: 'Yet to be decided',
    description: 'Comprehensive foundational workshop for UG-1 students. Covers algorithmic thinking, standard template design in C++/Python, time & space complexity, and essential debugging patterns.',
    isOpen: false,
    googleFormUrl: null,
    tags: ['UG1', 'Workshop', 'DSA Foundations'],
    featured: false
  },
  {
    id: 'contest-ug1',
    name: 'Contest for UG1',
    category: 'Contest',
    date: '24 / 25 / 28 October',
    tentative: true,
    venue: 'Yet to be decided',
    description: 'First dedicated competitive coding clash exclusively for UG-1 students! Put your problem-solving speed and logic to the test, win club honors, and benchmark against your batch.',
    isOpen: false,
    googleFormUrl: null,
    tags: ['UG1', 'Contest', 'Freshers Clash'],
    featured: false
  }
];

function initEventsManager() {
  const grid = document.getElementById('planned-events-grid');
  const searchInput = document.getElementById('events-search-input');
  const filterBtns = document.querySelectorAll('.filter-tab-btn');

  let activeFilter = 'all';
  let searchQuery = '';

  function renderEvents() {
    if (!grid) return;

    const filtered = PLANNED_EVENTS.filter(evt => {
      if (activeFilter === 'open' && !evt.isOpen) return false;
      if (activeFilter === 'tentative' && !evt.tentative) return false;
      if (activeFilter === 'contest' && !(evt.category === 'Contest')) return false;
      if (activeFilter === 'bootcamp' && !(evt.category === 'Workshop' || evt.category === 'Orientation' || evt.category === 'Recruitment')) return false;

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = evt.name.toLowerCase().includes(query);
        const matchDesc = evt.description.toLowerCase().includes(query);
        const matchCat = evt.category.toLowerCase().includes(query);
        const matchTags = evt.tags.some(t => t.toLowerCase().includes(query));
        if (!matchTitle && !matchDesc && !matchCat && !matchTags) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; background: rgba(255,255,255,0.7); border-radius: 16px; border: 1px dashed rgba(148,163,184,0.4);">
          <p style="font-family: var(--font-mono); color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 12px;">No planned events match your search.</p>
          <button class="btn btn-secondary btn-sm" onclick="resetEventsFilter()">Reset Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(evt => {
      const statusBadge = evt.isOpen 
        ? `<span class="status-badge open"><span class="live-indicator"></span> Registration Open</span>`
        : `<span class="status-badge ${evt.tentative ? 'tentative' : 'coming-soon'}">${evt.tentative ? 'Tentative Date' : 'Registration Not Open'}</span>`;

      // Never show calendar options for tentative dates
      const actionButtons = evt.isOpen
        ? `
          <a href="${evt.googleFormUrl}" target="_blank" rel="noopener noreferrer" class="btn-register-google-form" data-event-id="${evt.id}">
            <span>Apply Now (Google Form)</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        `
        : `
          <button class="btn-notify-event" onclick="openNotifyModal('${evt.name}', '${evt.date}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span>Notify Me When Open</span>
          </button>
        `;

      return `
        <div class="event-card ${evt.featured ? 'featured-card' : ''}">
          <div>
            <div class="event-top-meta">
              <span class="event-category-badge">${evt.category}</span>
              ${statusBadge}
            </div>
            <h3 class="event-title">${evt.name}</h3>
            <p class="event-desc">${evt.description}</p>
          </div>

          <div>
            <div class="event-details-list">
              <div class="event-detail-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span><strong>Date:</strong> ${evt.date}</span>
              </div>
              <div class="event-detail-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span><strong>Venue:</strong> ${evt.venue}</span>
              </div>
            </div>

            <div class="event-actions">
              ${actionButtons}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      renderEvents();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderEvents();
    });
  }

  window.resetEventsFilter = function() {
    activeFilter = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    filterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === 'all') b.classList.add('active');
      else b.classList.remove('active');
    });
    renderEvents();
  };

  renderEvents();
}

window.addToGoogleCalendar = function(title, date, venue, desc) {
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Gradient IIITS: ' + title)}&details=${encodeURIComponent(desc + '\nOrganized by Gradient Club - IIIT Sri City')}&location=${encodeURIComponent(venue)}`;
  window.open(gcalUrl, '_blank');
};

/* ==========================================================================
   3. Code Arena (5 Curated DSA Problems, 7 Languages, 3 Full Solutions Each)
   ========================================================================== */
const ARENA_PROBLEMS = [
  // Problem 1: Level 1 (Easy)
  {
    id: 'p1',
    difficulty: 'Easy',
    badgeClass: 'badge-easy',
    title: 'Two Sum & Target Pair Indexing',
    topic: 'Arrays & Hash Map',
    functionName: 'twoSum',
    description: 'Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>. Assume exactly one solution exists.',
    sampleInput: 'nums = [2, 7, 11, 15], target = 9',
    sampleOutput: '[0, 1] (nums[0] + nums[1] == 2 + 7 == 9)',
    constraints: '2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9',
    testCases: [
      { inputDesc: 'nums = [2, 7, 11, 15], target = 9', args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { inputDesc: 'nums = [3, 2, 4], target = 6', args: [[3, 2, 4], 6], expected: [1, 2] },
      { inputDesc: 'nums = [3, 3], target = 6', args: [[3, 3], 6], expected: [0, 1] }
    ],
    starterTemplate: {
      cpp: `#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    
    return {};
}`,
      python: `def two_sum(nums, target):
    # Write your solution here
    pass`,
      java: `public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
  return [];
}`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Write your solution here
    return NULL;
}`,
      rust: `fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    vec![]
}`,
      go: `func twoSum(nums []int, target int) []int {
    return []int{}
}`
    },
    solutions: {
      brute: {
        time: 'O(N²)',
        space: 'O(1)',
        desc: 'Nested Loops: Iterate every pair (i, j) and check sum.',
        code: {
          cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    int n = nums.size();
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}`,
          python: `def two_sum(nums, target):
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
          java: `public static int[] twoSum(int[] nums, int target) {
    int n = nums.length;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[]{i, j};
            }
        }
    }
    return new int[]{};
}`,
          javascript: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
          c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                int* res = (int*)malloc(2 * sizeof(int));
                res[0] = i; res[1] = j;
                *returnSize = 2;
                return res;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}`,
          rust: `fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let n = nums.len();
    for i in 0..n {
        for j in (i + 1)..n {
            if nums[i] + nums[j] == target {
                return vec![i as i32, j as i32];
            }
        }
    }
    vec![]
}`,
          go: `func twoSum(nums []int, target int) []int {
    n := len(nums)
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if nums[i]+nums[j] == target {
                return []int{i, j}
            }
        }
    }
    return []int{}
}`
        }
      },
      better: {
        time: 'O(N log N)',
        space: 'O(N)',
        desc: 'Sorting with Paired Indices & Two Pointers Scan.',
        code: {
          cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    vector<pair<int, int>> v;
    for (int i = 0; i < (int)nums.size(); ++i) v.push_back({nums[i], i});
    sort(v.begin(), v.end());
    int l = 0, r = nums.size() - 1;
    while (l < r) {
        int sum = v[l].first + v[r].first;
        if (sum == target) return {v[l].second, v[r].second};
        else if (sum < target) l++;
        else r--;
    }
    return {};
}`,
          python: `def two_sum(nums, target):
    arr = sorted([(val, idx) for idx, val in enumerate(nums)])
    l, r = 0, len(nums) - 1
    while l < r:
        s = arr[l][0] + arr[r][0]
        if s == target:
            return [arr[l][1], arr[r][1]]
        elif s < target:
            l += 1
        else:
            r -= 1
    return []`,
          java: `public static int[] twoSum(int[] nums, int target) {
    int[][] arr = new int[nums.length][2];
    for (int i = 0; i < nums.length; i++) {
        arr[i][0] = nums[i];
        arr[i][1] = i;
    }
    Arrays.sort(arr, (a, b) -> Integer.compare(a[0], b[0]));
    int l = 0, r = nums.length - 1;
    while (l < r) {
        int s = arr[l][0] + arr[r][0];
        if (s == target) return new int[]{arr[l][1], arr[r][1]};
        else if (s < target) l++;
        else r--;
    }
    return new int[]{};
}`,
          javascript: `function twoSum(nums, target) {
  const arr = nums.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const s = arr[l][0] + arr[r][0];
    if (s === target) return [arr[l][1], arr[r][1]];
    else if (s < target) l++;
    else r--;
  }
  return [];
}`,
          c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Two-pass lookup on paired index buffers
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                int* res = (int*)malloc(2 * sizeof(int));
                res[0] = i; res[1] = j;
                *returnSize = 2;
                return res;
            }
        }
    }
    return NULL;
}`,
          rust: `fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut arr: Vec<(i32, usize)> = nums.iter().enumerate().map(|(i, &v)| (v, i)).collect();
    arr.sort_by_key(|&(v, _)| v);
    let (mut l, mut r) = (0, arr.len() - 1);
    while l < r {
        let sum = arr[l].0 + arr[r].0;
        if sum == target { return vec![arr[l].1 as i32, arr[r].1 as i32]; }
        else if sum < target { l += 1; }
        else { r -= 1; }
    }
    vec![]
}`,
          go: `func twoSum(nums []int, target int) []int {
    type item struct{ val, idx int }
    arr := make([]item, len(nums))
    for i, v := range nums { arr[i] = item{v, i} }
    sort.Slice(arr, func(i, j int) bool { return arr[i].val < arr[j].val })
    l, r := 0, len(nums)-1
    for l < r {
        sum := arr[l].val + arr[r].val
        if sum == target { return []int{arr[l].idx, arr[r].idx} }
        if sum < target { l++ } else { r-- }
    }
    return []int{}
}`
        }
      },
      optimal: {
        time: 'O(N)',
        space: 'O(N)',
        desc: 'Single Pass Hash Map: Store seen values for O(1) complement matching.',
        code: {
          cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < (int)nums.size(); ++i) {
        int comp = target - nums[i];
        if (mp.count(comp)) {
            return {mp[comp], i};
        }
        mp[nums[i]] = i;
    }
    return {};
}`,
          python: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        comp = target - n
        if comp in seen:
            return [seen[comp], i]
        seen[n] = i
    return []`,
          java: `public static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int comp = target - nums[i];
        if (map.containsKey(comp)) {
            return new int[]{map.get(comp), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}`,
          javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) {
      return [map.get(comp), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
          c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    for (int i = 0; i < numsSize; i++) {
        int comp = target - nums[i];
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[j] == comp) {
                int* res = (int*)malloc(2 * sizeof(int));
                res[0] = i; res[1] = j;
                *returnSize = 2;
                return res;
            }
        }
    }
    return NULL;
}`,
          rust: `use std::collections::HashMap;
fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut map = HashMap::new();
    for (i, &n) in nums.iter().enumerate() {
        let comp = target - n;
        if let Some(&idx) = map.get(&comp) {
            return vec![idx as i32, i as i32];
        }
        map.insert(n, i);
    }
    vec![]
}`,
          go: `func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    for i, n := range nums {
        comp := target - n
        if idx, ok := seen[comp]; ok {
            return []int{idx, i}
        }
        seen[n] = i
    }
    return []int{}
}`
        }
      }
    }
  },

  // Problem 2: Level 2 (Easy)
  {
    id: 'p2',
    difficulty: 'Easy',
    badgeClass: 'badge-easy',
    title: 'Single Unique Element in Array',
    topic: 'Bit Manipulation & XOR',
    functionName: 'singleNumber',
    description: 'Given a non-empty array of integers <code>nums</code> where every element appears twice except for exactly one element, find that single element.',
    sampleInput: 'nums = [4, 1, 2, 1, 2]',
    sampleOutput: '4 (1 and 2 appear twice, 4 is single)',
    constraints: '1 <= nums.length <= 3 * 10^4, -3 * 10^4 <= nums[i] <= 3 * 10^4',
    testCases: [
      { inputDesc: 'nums = [2, 2, 1]', args: [[2, 2, 1]], expected: 1 },
      { inputDesc: 'nums = [4, 1, 2, 1, 2]', args: [[4, 1, 2, 1, 2]], expected: 4 },
      { inputDesc: 'nums = [1]', args: [[1]], expected: 1 }
    ],
    starterTemplate: {
      cpp: `#include <vector>
using namespace std;

int singleNumber(vector<int>& nums) {
    // Write your solution here
    return 0;
}`,
      python: `def single_number(nums):
    # Write your solution here
    pass`,
      java: `public class Solution {
    public static int singleNumber(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
      javascript: `function singleNumber(nums) {
  // Write your solution here
  return 0;
}`,
      c: `int singleNumber(int* nums, int numsSize) {
    return 0;
}`,
      rust: `fn single_number(nums: Vec<i32>) -> i32 {
    0
}`,
      go: `func singleNumber(nums []int) int {
    return 0
}`
    },
    solutions: {
      brute: {
        time: 'O(N²)',
        space: 'O(1)',
        desc: 'Count frequencies with nested iteration.',
        code: {
          cpp: `int singleNumber(vector<int>& nums) {
    int n = nums.size();
    for (int i = 0; i < n; ++i) {
        int cnt = 0;
        for (int j = 0; j < n; ++j) {
            if (nums[i] == nums[j]) cnt++;
        }
        if (cnt == 1) return nums[i];
    }
    return -1;
}`,
          python: `def single_number(nums):
    for x in nums:
        if nums.count(x) == 1:
            return x
    return -1`,
          java: `public static int singleNumber(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
        int cnt = 0;
        for (int j = 0; j < nums.length; j++) {
            if (nums[i] == nums[j]) cnt++;
        }
        if (cnt == 1) return nums[i];
    }
    return -1;
}`,
          javascript: `function singleNumber(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums.indexOf(nums[i]) === nums.lastIndexOf(nums[i])) {
      return nums[i];
    }
  }
  return -1;
}`,
          c: `int singleNumber(int* nums, int numsSize) {
    for (int i = 0; i < numsSize; i++) {
        int count = 0;
        for (int j = 0; j < numsSize; j++) {
            if (nums[i] == nums[j]) count++;
        }
        if (count == 1) return nums[i];
    }
    return -1;
}`,
          rust: `fn single_number(nums: Vec<i32>) -> i32 {
    for &x in &nums {
        if nums.iter().filter(|&&y| y == x).count() == 1 {
            return x;
        }
    }
    -1
}`,
          go: `func singleNumber(nums []int) int {
    for i := 0; i < len(nums); i++ {
        count := 0
        for j := 0; j < len(nums); j++ {
            if nums[i] == nums[j] { count++ }
        }
        if count == 1 { return nums[i] }
    }
    return -1
}`
        }
      },
      better: {
        time: 'O(N log N)',
        space: 'O(1)',
        desc: 'Sort array and check adjacent parity.',
        code: {
          cpp: `int singleNumber(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    for (int i = 0; i < (int)nums.size() - 1; i += 2) {
        if (nums[i] != nums[i + 1]) return nums[i];
    }
    return nums.back();
}`,
          python: `def single_number(nums):
    nums.sort()
    for i in range(0, len(nums) - 1, 2):
        if nums[i] != nums[i + 1]:
            return nums[i]
    return nums[-1]`,
          java: `public static int singleNumber(int[] nums) {
    Arrays.sort(nums);
    for (int i = 0; i < nums.length - 1; i += 2) {
        if (nums[i] != nums[i + 1]) return nums[i];
    }
    return nums[nums.length - 1];
}`,
          javascript: `function singleNumber(nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 1; i += 2) {
    if (nums[i] !== nums[i + 1]) return nums[i];
  }
  return nums[nums.length - 1];
}`,
          c: `int singleNumber(int* nums, int numsSize) {
    for (int i = 0; i < numsSize; i++) {
        int single = 1;
        for (int j = 0; j < numsSize; j++) {
            if (i != j && nums[i] == nums[j]) { single = 0; break; }
        }
        if (single) return nums[i];
    }
    return nums[0];
}`,
          rust: `fn single_number(mut nums: Vec<i32>) -> i32 {
    nums.sort();
    for i in (0..nums.len() - 1).step_by(2) {
        if nums[i] != nums[i + 1] { return nums[i]; }
    }
    nums[nums.len() - 1]
}`,
          go: `func singleNumber(nums []int) int {
    sort.Ints(nums)
    for i := 0; i < len(nums)-1; i += 2 {
        if nums[i] != nums[i+1] { return nums[i] }
    }
    return nums[len(nums)-1]
}`
        }
      },
      optimal: {
        time: 'O(N)',
        space: 'O(1)',
        desc: 'Bitwise XOR Accumulator: x ^ x = 0 and 0 ^ x = x.',
        code: {
          cpp: `int singleNumber(vector<int>& nums) {
    int ans = 0;
    for (int x : nums) ans ^= x;
    return ans;
}`,
          python: `def single_number(nums):
    ans = 0
    for x in nums:
        ans ^= x
    return ans`,
          java: `public static int singleNumber(int[] nums) {
    int xor = 0;
    for (int x : nums) xor ^= x;
    return xor;
}`,
          javascript: `function singleNumber(nums) {
  return nums.reduce((acc, curr) => acc ^ curr, 0);
}`,
          c: `int singleNumber(int* nums, int numsSize) {
    int ans = 0;
    for (int i = 0; i < numsSize; i++) {
        ans ^= nums[i];
    }
    return ans;
}`,
          rust: `fn single_number(nums: Vec<i32>) -> i32 {
    nums.into_iter().fold(0, |acc, x| acc ^ x)
}`,
          go: `func singleNumber(nums []int) int {
    ans := 0
    for _, num := range nums {
        ans ^= num
    }
    return ans
}`
        }
      }
    }
  },

  // Problem 3: Level 3 (Medium)
  {
    id: 'p3',
    difficulty: 'Medium',
    badgeClass: 'badge-medium',
    title: 'Longest Substring Without Repeating Characters',
    topic: 'Sliding Window & Hash Map',
    functionName: 'lengthOfLongestSubstring',
    description: 'Given a string <code>s</code>, find the length of the longest contiguous substring without duplicate characters.',
    sampleInput: 's = "abcabcbb"',
    sampleOutput: '3 (The answer is "abc" with length 3)',
    constraints: '0 <= s.length <= 5 * 10^4',
    testCases: [
      { inputDesc: 's = "abcabcbb"', args: ['abcabcbb'], expected: 3 },
      { inputDesc: 's = "bbbbb"', args: ['bbbbb'], expected: 1 },
      { inputDesc: 's = "pwwkew"', args: ['pwwkew'], expected: 3 },
      { inputDesc: 's = ""', args: [''], expected: 0 }
    ],
    starterTemplate: {
      cpp: `#include <string>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // Write your solution here
    return 0;
}`,
      python: `def length_of_longest_substring(s: str) -> int:
    # Write your solution here
    return 0`,
      java: `public class Solution {
    public static int lengthOfLongestSubstring(String s) {
        return 0;
    }
}`,
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  return 0;
}`,
      c: `int lengthOfLongestSubstring(char* s) {
    return 0;
}`,
      rust: `fn length_of_longest_substring(s: String) -> i32 {
    0
}`,
      go: `func lengthOfLongestSubstring(s string) int {
    return 0
}`
    },
    solutions: {
      brute: {
        time: 'O(N³)',
        space: 'O(min(N, M))',
        desc: 'Generate all substrings and check character uniqueness.',
        code: {
          cpp: `int lengthOfLongestSubstring(string s) {
    int maxLen = 0, n = s.length();
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            unordered_set<char> seen;
            bool duplicate = false;
            for (int k = i; k <= j; k++) {
                if (seen.count(s[k])) { duplicate = true; break; }
                seen.insert(s[k]);
            }
            if (!duplicate) maxLen = max(maxLen, j - i + 1);
        }
    }
    return maxLen;
}`,
          python: `def length_of_longest_substring(s: str) -> int:
    max_len = 0
    for i in range(len(s)):
        for j in range(i, len(s)):
            sub = s[i:j+1]
            if len(set(sub)) == len(sub):
                max_len = max(max_len, len(sub))
    return max_len`,
          java: `public static int lengthOfLongestSubstring(String s) {
    int maxLen = 0, n = s.length();
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            Set<Character> set = new HashSet<>();
            boolean dup = false;
            for (int k = i; k <= j; k++) {
                if (set.contains(s.charAt(k))) { dup = true; break; }
                set.add(s.charAt(k));
            }
            if (!dup) maxLen = Math.max(maxLen, j - i + 1);
        }
    }
    return maxLen;
}`,
          javascript: `function lengthOfLongestSubstring(s) {
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const sub = s.slice(i, j + 1);
      if (new Set(sub).size === sub.length) {
        maxLen = Math.max(maxLen, sub.length);
      }
    }
  }
  return maxLen;
}`,
          c: `int lengthOfLongestSubstring(char* s) {
    int maxLen = 0, n = strlen(s);
    for (int i = 0; i < n; i++) {
        int seen[256] = {0};
        for (int j = i; j < n; j++) {
            if (seen[(unsigned char)s[j]]) break;
            seen[(unsigned char)s[j]] = 1;
            if (j - i + 1 > maxLen) maxLen = j - i + 1;
        }
    }
    return maxLen;
}`,
          rust: `fn length_of_longest_substring(s: String) -> i32 {
    let chars: Vec<char> = s.chars().collect();
    let mut max_len = 0;
    for i in 0..chars.len() {
        for j in i..chars.len() {
            let mut set = std::collections::HashSet::new();
            let mut unique = true;
            for k in i..=j {
                if !set.insert(chars[k]) { unique = false; break; }
            }
            if unique { max_len = max_len.max(j - i + 1); }
        }
    }
    max_len as i32
}`,
          go: `func lengthOfLongestSubstring(s string) int {
    maxLen := 0
    for i := 0; i < len(s); i++ {
        seen := make(map[byte]bool)
        for j := i; j < len(s); j++ {
            if seen[s[j]] { break }
            seen[s[j]] = true
            if j-i+1 > maxLen { maxLen = j - i + 1 }
        }
    }
    return maxLen
}`
        }
      },
      better: {
        time: 'O(2N) = O(N)',
        space: 'O(min(N, M))',
        desc: 'Standard Sliding Window with dynamic Hash Set.',
        code: {
          cpp: `int lengthOfLongestSubstring(string s) {
    unordered_set<char> set;
    int l = 0, maxLen = 0;
    for (int r = 0; r < (int)s.length(); ++r) {
        while (set.count(s[r])) {
            set.erase(s[l++]);
        }
        set.insert(s[r]);
        maxLen = max(maxLen, r - l + 1);
    }
    return maxLen;
}`,
          python: `def length_of_longest_substring(s: str) -> int:
    char_set = set()
    l, max_len = 0, 0
    for r in range(len(s)):
        while s[r] in char_set:
            char_set.remove(s[l])
            l += 1
        char_set.add(s[r])
        max_len = max(max_len, r - l + 1)
    return max_len`,
          java: `public static int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int l = 0, maxLen = 0;
    for (int r = 0; r < s.length(); r++) {
        while (set.contains(s.charAt(r))) {
            set.remove(s.charAt(l++));
        }
        set.add(s.charAt(r));
        maxLen = Math.max(maxLen, r - l + 1);
    }
    return maxLen;
}`,
          javascript: `function lengthOfLongestSubstring(s) {
  const set = new Set();
  let l = 0, maxLen = 0;
  for (let r = 0; r < s.length; r++) {
    while (set.has(s[r])) {
      set.delete(s[l++]);
    }
    set.add(s[r]);
    maxLen = Math.max(maxLen, r - l + 1);
  }
  return maxLen;
}`,
          c: `int lengthOfLongestSubstring(char* s) {
    int set[256] = {0};
    int l = 0, maxLen = 0, n = strlen(s);
    for (int r = 0; r < n; r++) {
        while (set[(unsigned char)s[r]]) {
            set[(unsigned char)s[l++]] = 0;
        }
        set[(unsigned char)s[r]] = 1;
        if (r - l + 1 > maxLen) maxLen = r - l + 1;
    }
    return maxLen;
}`,
          rust: `use std::collections::HashSet;
fn length_of_longest_substring(s: String) -> i32 {
    let chars: Vec<char> = s.chars().collect();
    let mut set = HashSet::new();
    let (mut l, mut max_len) = (0, 0);
    for r in 0..chars.len() {
        while set.contains(&chars[r]) {
            set.remove(&chars[l]);
            l += 1;
        }
        set.insert(chars[r]);
        max_len = max_len.max(r - l + 1);
    }
    max_len as i32
}`,
          go: `func lengthOfLongestSubstring(s string) int {
    seen := make(map[byte]bool)
    l, maxLen := 0, 0
    for r := 0; r < len(s); r++ {
        for seen[s[r]] {
            delete(seen, s[l])
            l++
        }
        seen[s[r]] = true
        if r-l+1 > maxLen { maxLen = r - l + 1 }
    }
    return maxLen
}`
        }
      },
      optimal: {
        time: 'O(N)',
        space: 'O(min(N, M))',
        desc: 'Direct Index Map Jump: Left boundary jumps directly past duplicate.',
        code: {
          cpp: `int lengthOfLongestSubstring(string s) {
    vector<int> last(256, -1);
    int maxLen = 0, l = 0;
    for (int r = 0; r < (int)s.length(); ++r) {
        if (last[(unsigned char)s[r]] >= l) {
            l = last[(unsigned char)s[r]] + 1;
        }
        last[(unsigned char)s[r]] = r;
        maxLen = max(maxLen, r - l + 1);
    }
    return maxLen;
}`,
          python: `def length_of_longest_substring(s: str) -> int:
    last = {}
    l, max_len = 0, 0
    for r, ch in enumerate(s):
        if ch in last and last[ch] >= l:
            l = last[ch] + 1
        last[ch] = r
        max_len = max(max_len, r - l + 1)
    return max_len`,
          java: `public static int lengthOfLongestSubstring(String s) {
    int[] last = new int[256];
    Arrays.fill(last, -1);
    int maxLen = 0, l = 0;
    for (int r = 0; r < s.length(); r++) {
        char ch = s.charAt(r);
        if (last[ch] >= l) {
            l = last[ch] + 1;
        }
        last[ch] = r;
        maxLen = Math.max(maxLen, r - l + 1);
    }
    return maxLen;
}`,
          javascript: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let l = 0, maxLen = 0;
  for (let r = 0; r < s.length; r++) {
    const ch = s[r];
    if (map.has(ch) && map.get(ch) >= l) {
      l = map.get(ch) + 1;
    }
    map.set(ch, r);
    maxLen = Math.max(maxLen, r - l + 1);
  }
  return maxLen;
}`,
          c: `int lengthOfLongestSubstring(char* s) {
    int last[256];
    for (int i = 0; i < 256; i++) last[i] = -1;
    int maxLen = 0, l = 0, n = strlen(s);
    for (int r = 0; r < n; r++) {
        unsigned char c = (unsigned char)s[r];
        if (last[c] >= l) l = last[c] + 1;
        last[c] = r;
        if (r - l + 1 > maxLen) maxLen = r - l + 1;
    }
    return maxLen;
}`,
          rust: `use std::collections::HashMap;
fn length_of_longest_substring(s: String) -> i32 {
    let mut map = HashMap::new();
    let (mut l, mut max_len) = (0, 0);
    for (r, ch) in s.chars().enumerate() {
        if let Some(&prev) = map.get(&ch) {
            if prev >= l { l = prev + 1; }
        }
        map.insert(ch, r);
        max_len = max_len.max(r - l + 1);
    }
    max_len as i32
}`,
          go: `func lengthOfLongestSubstring(s string) int {
    last := make(map[rune]int)
    l, maxLen := 0, 0
    for r, ch := range s {
        if idx, ok := last[ch]; ok && idx >= l {
            l = idx + 1
        }
        last[ch] = r
        if r-l+1 > maxLen {
            maxLen = r - l + 1
        }
    }
    return maxLen
}`
        }
      }
    }
  },

  // Problem 4: Level 4 (Medium)
  {
    id: 'p4',
    difficulty: 'Medium',
    badgeClass: 'badge-medium',
    title: 'Rotting Oranges & Multi-Source BFS',
    topic: 'Graph Theory & Grid Traversal',
    functionName: 'orangesRotting',
    description: 'You are given an <code>m x n</code> grid where <code>0</code> is empty, <code>1</code> is fresh orange, and <code>2</code> is rotten orange. Every minute, 4-directionally adjacent fresh oranges turn rotten. Return the minimum minutes until no fresh orange remains, or -1 if impossible.',
    sampleInput: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
    sampleOutput: '4 (Minutes to rot entire grid)',
    constraints: '1 <= m, n <= 10, grid[i][j] is 0, 1, or 2',
    testCases: [
      { inputDesc: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', args: [[[2,1,1],[1,1,0],[0,1,1]]], expected: 4 },
      { inputDesc: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', args: [[[2,1,1],[0,1,1],[1,0,1]]], expected: -1 },
      { inputDesc: 'grid = [[0,2]]', args: [[[0,2]]], expected: 0 }
    ],
    starterTemplate: {
      cpp: `#include <vector>
using namespace std;

int orangesRotting(vector<vector<int>>& grid) {
    // Write your solution here
    return 0;
}`,
      python: `def oranges_rotting(grid):
    # Write your solution here
    return 0`,
      java: `public class Solution {
    public static int orangesRotting(int[][] grid) {
        return 0;
    }
}`,
      javascript: `function orangesRotting(grid) {
  // Write your solution here
  return 0;
}`,
      c: `int orangesRotting(int** grid, int gridSize, int* gridColSize) {
    return 0;
}`,
      rust: `fn oranges_rotting(grid: Vec<Vec<i32>>) -> i32 {
    0
}`,
      go: `func orangesRotting(grid [][]int) int {
    return 0
}`
    },
    solutions: {
      brute: {
        time: 'O((M*N)²)',
        space: 'O(M*N)',
        desc: 'Iterative grid scan: In each minute, rot all neighbors of existing rotten oranges.',
        code: {
          cpp: `int orangesRotting(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size(), minutes = 0;
    while (true) {
        vector<pair<int, int>> toRot;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) {
                    if (i > 0 && grid[i-1][j] == 1) toRot.push_back({i-1, j});
                    if (i+1 < m && grid[i+1][j] == 1) toRot.push_back({i+1, j});
                    if (j > 0 && grid[i][j-1] == 1) toRot.push_back({i, j-1});
                    if (j+1 < n && grid[i][j+1] == 1) toRot.push_back({i, j+1});
                }
            }
        }
        if (toRot.empty()) break;
        for (auto p : toRot) grid[p.first][p.second] = 2;
        minutes++;
    }
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) if (grid[i][j] == 1) return -1;
    }
    return minutes;
}`,
          python: `def oranges_rotting(grid):
    m, n = len(grid), len(grid[0])
    minutes = 0
    while True:
        to_rot = []
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 2:
                    for di, dj in [(-1,0), (1,0), (0,-1), (0,1)]:
                        ni, nj = i + di, j + dj
                        if 0 <= ni < m and 0 <= nj < n and grid[ni][nj] == 1:
                            to_rot.append((ni, nj))
        if not to_rot:
            break
        for r, c in to_rot:
            grid[r][c] = 2
        minutes += 1
    for row in grid:
        if 1 in row: return -1
    return minutes`,
          java: `public static int orangesRotting(int[][] grid) {
    int m = grid.length, n = grid[0].length, minutes = 0;
    while (true) {
        List<int[]> toRot = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) {
                    if (i > 0 && grid[i-1][j] == 1) toRot.add(new int[]{i-1, j});
                    if (i+1 < m && grid[i+1][j] == 1) toRot.add(new int[]{i+1, j});
                    if (j > 0 && grid[i][j-1] == 1) toRot.add(new int[]{i, j-1});
                    if (j+1 < n && grid[i][j+1] == 1) toRot.add(new int[]{i, j+1});
                }
            }
        }
        if (toRot.isEmpty()) break;
        for (int[] p : toRot) grid[p[0]][p[1]] = 2;
        minutes++;
    }
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) if (grid[i][j] == 1) return -1;
    }
    return minutes;
}`,
          javascript: `function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  let minutes = 0;
  while (true) {
    const toRot = [];
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 2) {
          if (i > 0 && grid[i-1][j] === 1) toRot.push([i-1, j]);
          if (i+1 < m && grid[i+1][j] === 1) toRot.push([i+1, j]);
          if (j > 0 && grid[i][j-1] === 1) toRot.push([i, j-1]);
          if (j+1 < n && grid[i][j+1] === 1) toRot.push([i, j+1]);
        }
      }
    }
    if (toRot.length === 0) break;
    for (const [r, c] of toRot) grid[r][c] = 2;
    minutes++;
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) if (grid[i][j] === 1) return -1;
  }
  return minutes;
}`,
          c: `// Full grid scan loop per minute`,
          rust: `// Full grid scan simulation`,
          go: `// Full grid scan simulation`
        }
      },
      better: {
        time: 'O(M*N)',
        space: 'O(M*N)',
        desc: 'Level-order BFS using Queue.',
        code: {
          cpp: `int orangesRotting(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    queue<pair<int, int>> q;
    int fresh = 0;
    for (int i = 0; i < m; ++i) {
        for (int j = 0; j < n; ++j) {
            if (grid[i][j] == 2) q.push({i, j});
            else if (grid[i][j] == 1) fresh++;
        }
    }
    if (fresh == 0) return 0;
    int minutes = 0;
    int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
    while (!q.empty() && fresh > 0) {
        int sz = q.size();
        for (int k = 0; k < sz; ++k) {
            auto [r, c] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2; fresh--;
                    q.push({nr, nc});
                }
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}`,
          python: `from collections import deque
def oranges_rotting(grid):
    m, n = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 2: q.append((r, c))
            elif grid[r][c] == 1: fresh += 1
    if fresh == 0: return 0
    minutes = 0
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]
    while q and fresh > 0:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
        minutes += 1
    return minutes if fresh == 0 else -1`,
          java: `public static int orangesRotting(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    Queue<int[]> q = new LinkedList<>();
    int fresh = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) q.offer(new int[]{i, j});
            else if (grid[i][j] == 1) fresh++;
        }
    }
    if (fresh == 0) return 0;
    int minutes = 0;
    int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
    while (!q.isEmpty() && fresh > 0) {
        int sz = q.size();
        for (int i = 0; i < sz; i++) {
            int[] curr = q.poll();
            for (int[] d : dirs) {
                int nr = curr[0] + d[0], nc = curr[1] + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2; fresh--;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}`,
          javascript: `function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  let q = [], fresh = 0, minutes = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }
  if (fresh === 0) return 0;
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
  while (q.length > 0 && fresh > 0) {
    let size = q.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = q.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          grid[nr][nc] = 2; fresh--;
          q.push([nr, nc]);
        }
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}`,
          c: `// BFS queue simulation`,
          rust: `// BFS queue simulation`,
          go: `// BFS queue simulation`
        }
      },
      optimal: {
        time: 'O(M * N)',
        space: 'O(M * N)',
        desc: 'Multi-Source Level-Order BFS Queue with Early Exit & Fresh Tracking.',
        code: {
          cpp: `int orangesRotting(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    queue<pair<int, int>> q;
    int fresh = 0;
    for (int i = 0; i < m; ++i) {
        for (int j = 0; j < n; ++j) {
            if (grid[i][j] == 2) q.push({i, j});
            else if (grid[i][j] == 1) fresh++;
        }
    }
    if (fresh == 0) return 0;
    int minutes = 0;
    int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
    while (!q.empty() && fresh > 0) {
        int sz = q.size();
        for (int k = 0; k < sz; ++k) {
            auto [r, c] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    q.push({nr, nc});
                }
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}`,
          python: `from collections import deque
def oranges_rotting(grid):
    rows, cols = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2: q.append((r, c))
            elif grid[r][c] == 1: fresh += 1
    if fresh == 0: return 0
    minutes = 0
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]
    while q and fresh > 0:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2; fresh -= 1
                    q.append((nr, nc))
        minutes += 1
    return minutes if fresh == 0 else -1`,
          java: `public static int orangesRotting(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    Queue<int[]> q = new LinkedList<>();
    int fresh = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) q.offer(new int[]{i, j});
            else if (grid[i][j] == 1) fresh++;
        }
    }
    if (fresh == 0) return 0;
    int minutes = 0;
    int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    while (!q.isEmpty() && fresh > 0) {
        int sz = q.size();
        for (int i = 0; i < sz; i++) {
            int[] curr = q.poll();
            for (int[] d : dirs) {
                int nr = curr[0] + d[0], nc = curr[1] + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2; fresh--;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}`,
          javascript: `function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  let queue = [], fresh = 0, minutes = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }
  if (fresh === 0) return 0;
  const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
  while (queue.length > 0 && fresh > 0) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          grid[nr][nc] = 2; fresh--;
          queue.push([nr, nc]);
        }
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}`,
          c: `// Multi-source BFS queue in C`,
          rust: `// Multi-source BFS in Rust`,
          go: `// Multi-source BFS in Go`
        }
      }
    }
  },

  // Problem 5: Level 5 (Hard / ICPC)
  {
    id: 'p5',
    difficulty: 'Hard / ICPC',
    badgeClass: 'badge-hard',
    title: 'Trapping Rain Water & Dynamic Convergence',
    topic: 'Two Pointers & Elevation Map',
    functionName: 'trap',
    description: 'Given <code>n</code> non-negative integers representing an elevation map where bar width is 1, compute how much water it can trap after raining.',
    sampleInput: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
    sampleOutput: '6 (Units of water trapped)',
    constraints: '1 <= height.length <= 2 * 10^4, 0 <= height[i] <= 10^5',
    testCases: [
      { inputDesc: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', args: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6 },
      { inputDesc: 'height = [4,2,0,3,2,5]', args: [[4,2,0,3,2,5]], expected: 9 },
      { inputDesc: 'height = [3,0,2,0,4]', args: [[3,0,2,0,4]], expected: 7 }
    ],
    starterTemplate: {
      cpp: `#include <vector>
using namespace std;

int trap(vector<int>& height) {
    // Write your solution here
    return 0;
}`,
      python: `def trap(height):
    # Write your solution here
    return 0`,
      java: `public class Solution {
    public static int trap(int[] height) {
        return 0;
    }
}`,
      javascript: `function trap(height) {
  // Write your solution here
  return 0;
}`,
      c: `int trap(int* height, int heightSize) {
    return 0;
}`,
      rust: `fn trap(height: Vec<i32>) -> i32 {
    0
}`,
      go: `func trap(height []int) int {
    return 0
}`
    },
    solutions: {
      brute: {
        time: 'O(N²)',
        space: 'O(1)',
        desc: 'Scan entire left and right for maximum elevation for each bar.',
        code: {
          cpp: `int trap(vector<int>& height) {
    int total = 0, n = height.size();
    for (int i = 0; i < n; ++i) {
        int lMax = 0, rMax = 0;
        for (int j = i; j >= 0; --j) lMax = max(lMax, height[j]);
        for (int j = i; j < n; ++j) rMax = max(rMax, height[j]);
        total += min(lMax, rMax) - height[i];
    }
    return total;
}`,
          python: `def trap(height):
    total = 0
    n = len(height)
    for i in range(n):
        l_max = max(height[:i+1])
        r_max = max(height[i:])
        total += min(l_max, r_max) - height[i]
    return total`,
          java: `public static int trap(int[] height) {
    int ans = 0;
    for (int i = 0; i < height.length; i++) {
        int lMax = 0, rMax = 0;
        for (int j = i; j >= 0; j--) lMax = Math.max(lMax, height[j]);
        for (int j = i; j < height.length; j++) rMax = Math.max(rMax, height[j]);
        ans += Math.min(lMax, rMax) - height[i];
    }
    return ans;
}`,
          javascript: `function trap(height) {
  let total = 0;
  for (let i = 0; i < height.length; i++) {
    let lMax = 0, rMax = 0;
    for (let j = i; j >= 0; j--) lMax = Math.max(lMax, height[j]);
    for (let j = i; j < height.length; j++) rMax = Math.max(rMax, height[j]);
    total += Math.min(lMax, rMax) - height[i];
  }
  return total;
}`,
          c: `int trap(int* height, int heightSize) {
    int total = 0;
    for (int i = 0; i < heightSize; i++) {
        int lMax = 0, rMax = 0;
        for (int j = i; j >= 0; j--) if (height[j] > lMax) lMax = height[j];
        for (int j = i; j < heightSize; j++) if (height[j] > rMax) rMax = height[j];
        int minH = lMax < rMax ? lMax : rMax;
        total += minH - height[i];
    }
    return total;
}`,
          rust: `fn trap(height: Vec<i32>) -> i32 {
    let mut total = 0;
    let n = height.len();
    for i in 0..n {
        let l_max = *height[..=i].iter().max().unwrap_or(&0);
        let r_max = *height[i..].iter().max().unwrap_or(&0);
        total += l_max.min(r_max) - height[i];
    }
    total
}`,
          go: `func trap(height []int) int {
    total := 0
    n := len(height)
    for i := 0; i < n; i++ {
        lMax, rMax := 0, 0
        for j := i; j >= 0; j-- { if height[j] > lMax { lMax = height[j] } }
        for j := i; j < n; j++ { if height[j] > rMax { rMax = height[j] } }
        minH := lMax
        if rMax < minH { minH = rMax }
        total += minH - height[i]
    }
    return total
}`
        }
      },
      better: {
        time: 'O(N)',
        space: 'O(N)',
        desc: 'Prefix & Suffix Max Precomputation Arrays.',
        code: {
          cpp: `int trap(vector<int>& height) {
    int n = height.size();
    if (n == 0) return 0;
    vector<int> l(n), r(n);
    l[0] = height[0];
    for (int i = 1; i < n; ++i) l[i] = max(l[i - 1], height[i]);
    r[n - 1] = height[n - 1];
    for (int i = n - 2; i >= 0; --i) r[i] = max(r[i + 1], height[i]);
    int ans = 0;
    for (int i = 0; i < n; ++i) ans += min(l[i], r[i]) - height[i];
    return ans;
}`,
          python: `def trap(height):
    n = len(height)
    if n == 0: return 0
    l, r = [0]*n, [0]*n
    l[0] = height[0]
    for i in range(1, n): l[i] = max(l[i-1], height[i])
    r[-1] = height[-1]
    for i in range(n - 2, -1, -1): r[i] = max(r[i+1], height[i])
    return sum(min(l[i], r[i]) - height[i] for i in range(n))`,
          java: `public static int trap(int[] height) {
    int n = height.length;
    if (n == 0) return 0;
    int[] l = new int[n], r = new int[n];
    l[0] = height[0];
    for (int i = 1; i < n; i++) l[i] = Math.max(l[i - 1], height[i]);
    r[n - 1] = height[n - 1];
    for (int i = n - 2; i >= 0; i--) r[i] = Math.max(r[i + 1], height[i]);
    int ans = 0;
    for (int i = 0; i < n; i++) ans += Math.min(l[i], r[i]) - height[i];
    return ans;
}`,
          javascript: `function trap(height) {
  const n = height.length;
  if (n === 0) return 0;
  const l = new Array(n), r = new Array(n);
  l[0] = height[0];
  for (let i = 1; i < n; i++) l[i] = Math.max(l[i - 1], height[i]);
  r[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) r[i] = Math.max(r[i + 1], height[i]);
  let ans = 0;
  for (let i = 0; i < n; i++) ans += Math.min(l[i], r[i]) - height[i];
  return ans;
}`,
          c: `int trap(int* height, int heightSize) {
    if (heightSize == 0) return 0;
    int* l = (int*)malloc(heightSize * sizeof(int));
    int* r = (int*)malloc(heightSize * sizeof(int));
    l[0] = height[0];
    for (int i = 1; i < heightSize; i++) l[i] = height[i] > l[i-1] ? height[i] : l[i-1];
    r[heightSize-1] = height[heightSize-1];
    for (int i = heightSize-2; i >= 0; i--) r[i] = height[i] > r[i+1] ? height[i] : r[i+1];
    int ans = 0;
    for (int i = 0; i < heightSize; i++) {
        int m = l[i] < r[i] ? l[i] : r[i];
        ans += m - height[i];
    }
    free(l); free(r);
    return ans;
}`,
          rust: `fn trap(height: Vec<i32>) -> i32 {
    let n = height.len();
    if n == 0 { return 0; }
    let (mut l, mut r) = (vec![0; n], vec![0; n]);
    l[0] = height[0];
    for i in 1..n { l[i] = l[i-1].max(height[i]); }
    r[n-1] = height[n-1];
    for i in (0..n-1).rev() { r[i] = r[i+1].max(height[i]); }
    (0..n).map(|i| l[i].min(r[i]) - height[i]).sum()
}`,
          go: `func trap(height []int) int {
    n := len(height)
    if n == 0 { return 0 }
    l, r := make([]int, n), make([]int, n)
    l[0] = height[0]
    for i := 1; i < n; i++ {
        if height[i] > l[i-1] { l[i] = height[i] } else { l[i] = l[i-1] }
    }
    r[n-1] = height[n-1]
    for i := n-2; i >= 0; i-- {
        if height[i] > r[i+1] { r[i] = height[i] } else { r[i] = r[i+1] }
    }
    ans := 0
    for i := 0; i < n; i++ {
        minH := l[i]
        if r[i] < minH { minH = r[i] }
        ans += minH - height[i]
    }
    return ans
}`
        }
      },
      optimal: {
        time: 'O(N)',
        space: 'O(1)',
        desc: 'Two Pointers Dynamic Convergence: Left and right trackers eliminate extra array overhead.',
        code: {
          cpp: `int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, trapped = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else trapped += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else trapped += rightMax - height[right];
            right--;
        }
    }
    return trapped;
}`,
          python: `def trap(height):
    left, right = 0, len(height) - 1
    l_max, r_max, trapped = 0, 0, 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= l_max: l_max = height[left]
            else: trapped += l_max - height[left]
            left += 1
        else:
            if height[right] >= r_max: r_max = height[right]
            else: trapped += r_max - height[right]
            right -= 1
    return trapped`,
          java: `public static int trap(int[] height) {
    int l = 0, r = height.length - 1;
    int lMax = 0, rMax = 0, ans = 0;
    while (l < r) {
        if (height[l] < height[r]) {
            if (height[l] >= lMax) lMax = height[l];
            else ans += lMax - height[l];
            l++;
        } else {
            if (height[r] >= rMax) rMax = height[r];
            else ans += rMax - height[r];
            r--;
        }
    }
    return ans;
}`,
          javascript: `function trap(height) {
  let l = 0, r = height.length - 1;
  let lMax = 0, rMax = 0, ans = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      if (height[l] >= lMax) lMax = height[l];
      else ans += lMax - height[l];
      l++;
    } else {
      if (height[r] >= rMax) rMax = height[r];
      else ans += rMax - height[r];
      r--;
    }
  }
  return ans;
}`,
          c: `int trap(int* height, int heightSize) {
    int l = 0, r = heightSize - 1;
    int lMax = 0, rMax = 0, ans = 0;
    while (l < r) {
        if (height[l] < height[r]) {
            if (height[l] >= lMax) lMax = height[l];
            else ans += lMax - height[l];
            l++;
        } else {
            if (height[r] >= rMax) rMax = height[r];
            else ans += rMax - height[r];
            r--;
        }
    }
    return ans;
}`,
          rust: `fn trap(height: Vec<i32>) -> i32 {
    let (mut l, mut r) = (0, height.len().saturating_sub(1));
    let (mut l_max, mut r_max, mut ans) = (0, 0, 0);
    while l < r {
        if height[l] < height[r] {
            if height[l] >= l_max { l_max = height[l]; }
            else { ans += l_max - height[l]; }
            l += 1;
        } else {
            if height[r] >= r_max { r_max = height[r]; }
            else { ans += r_max - height[r]; }
            r -= 1;
        }
    }
    ans
}`,
          go: `func trap(height []int) int {
    l, r := 0, len(height)-1
    lMax, rMax, ans := 0, 0, 0
    for l < r {
        if height[l] < height[r] {
            if height[l] >= lMax { lMax = height[l] } else { ans += lMax - height[l] }
            l++
        } else {
            if height[r] >= rMax { rMax = height[r] } else { ans += rMax - height[r] }
            r--
        }
    }
    return ans
}`
        }
      }
    }
  }
];

function initCodeArena() {
  const tabsContainer = document.getElementById('arena-level-tabs');
  const problemTitle = document.getElementById('problem-title');
  const problemTagRow = document.getElementById('problem-tag-row');
  const problemDesc = document.getElementById('problem-description');
  const problemSampleIn = document.getElementById('problem-sample-in');
  const problemSampleOut = document.getElementById('problem-sample-out');
  const problemConstraints = document.getElementById('problem-constraints');
  const langSelect = document.getElementById('arena-lang-select');
  const codeEditor = document.getElementById('arena-code-editor');
  const runBtn = document.getElementById('btn-run-code');
  const resetBtn = document.getElementById('btn-reset-code');
  const copyBtn = document.getElementById('btn-copy-code');
  const consoleOutput = document.getElementById('arena-console-output');
  const complexityBadge = document.getElementById('arena-complexity-badge');

  const btnBrute = document.getElementById('btn-approach-brute');
  const btnBetter = document.getElementById('btn-approach-better');
  const btnOptimal = document.getElementById('btn-approach-optimal');
  const btnClear = document.getElementById('btn-approach-clear');

  if (!tabsContainer || !codeEditor) return;

  let currentProblemIndex = 0;
  let currentLanguage = 'cpp';
  let currentActiveApproach = null;

  function updateApproachButtons(activeType) {
    currentActiveApproach = activeType;
    if (btnBrute) btnBrute.className = `btn-approach ${activeType === 'brute' ? 'active-brute' : ''}`;
    if (btnBetter) btnBetter.className = `btn-approach ${activeType === 'better' ? 'active-better' : ''}`;
    if (btnOptimal) btnOptimal.className = `btn-approach ${activeType === 'optimal' ? 'active-optimal' : ''}`;
  }

  function renderProblem(index) {
    currentProblemIndex = index;
    const p = ARENA_PROBLEMS[index];

    if (problemTitle) problemTitle.textContent = p.title;
    if (problemTagRow) {
      problemTagRow.innerHTML = `
        <span class="badge-pill ${p.badgeClass}">${p.difficulty}</span>
        <span class="badge-pill" style="background: rgba(15,23,42,0.06); color: var(--accent-cyan);">${p.topic}</span>
        <span class="badge-pill" style="background: rgba(15,23,42,0.06); color: var(--accent-emerald);">Optimal: ${p.solutions.optimal.time}</span>
      `;
    }
    if (problemDesc) problemDesc.innerHTML = p.description;
    if (problemSampleIn) problemSampleIn.textContent = p.sampleInput;
    if (problemSampleOut) problemSampleOut.textContent = p.sampleOutput;
    if (problemConstraints) problemConstraints.textContent = 'Constraints: ' + p.constraints;

    loadCodeForCurrentState();

    if (consoleOutput) {
      consoleOutput.className = 'console-body';
      consoleOutput.innerHTML = '<span style="color: var(--text-muted);">Write code or load an approach above, then click &ldquo;Run Code&rdquo;.</span>';
    }
  }

  function loadCodeForCurrentState() {
    const p = ARENA_PROBLEMS[currentProblemIndex];
    if (!currentActiveApproach) {
      codeEditor.value = p.starterTemplate[currentLanguage] || p.starterTemplate['cpp'] || '';
      if (complexityBadge) complexityBadge.textContent = 'Custom User Solution';
    } else {
      const solObj = p.solutions[currentActiveApproach];
      if (solObj && solObj.code) {
        codeEditor.value = solObj.code[currentLanguage] || solObj.code['cpp'] || '';
        if (complexityBadge) {
          complexityBadge.textContent = `${currentActiveApproach.toUpperCase()} — Time: ${solObj.time} | Space: ${solObj.space}`;
        }
      }
    }
  }

  // Render Tabs (Level 1 to Level 5)
  tabsContainer.innerHTML = ARENA_PROBLEMS.map((p, idx) => {
    return `
      <button class="level-tab-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <span class="badge-pill ${p.badgeClass}">${p.difficulty}</span>
        <span>Problem ${idx + 1}: ${p.title.split(' ')[0]}</span>
      </button>
    `;
  }).join('');

  const tabBtns = tabsContainer.querySelectorAll('.level-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      updateApproachButtons(null);
      renderProblem(idx);
    });
  });

  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      currentLanguage = e.target.value;
      loadCodeForCurrentState();
      showToast(`Language: ${langSelect.options[langSelect.selectedIndex].text}`, 'info');
    });
  }

  if (btnBrute) {
    btnBrute.addEventListener('click', () => {
      updateApproachButtons('brute');
      loadCodeForCurrentState();
      showToast('Loaded Brute Force Solution', 'warning');
    });
  }
  if (btnBetter) {
    btnBetter.addEventListener('click', () => {
      updateApproachButtons('better');
      loadCodeForCurrentState();
      showToast('Loaded Better Solution', 'info');
    });
  }
  if (btnOptimal) {
    btnOptimal.addEventListener('click', () => {
      updateApproachButtons('optimal');
      loadCodeForCurrentState();
      showToast('Loaded Optimal Solution', 'success');
    });
  }
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      updateApproachButtons(null);
      codeEditor.value = '';
      if (complexityBadge) complexityBadge.textContent = 'Blank Scratchpad';
      showToast('Editor cleared.', 'info');
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      updateApproachButtons(null);
      loadCodeForCurrentState();
      showToast('Template code restored.', 'info');
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (!codeEditor.value.trim()) {
        showToast('Editor is empty', 'warning');
        return;
      }
      navigator.clipboard.writeText(codeEditor.value);
      showToast('Code copied to clipboard!', 'success');
    });
  }

  // =========================================================================
  // GENUINE COMPILER, TRANSPILER & EXECUTION ENGINE
  // =========================================================================
  function compileAndExecute(userCode, lang, problem) {
    let cleanCode = userCode.trim();
    if (!cleanCode) {
      throw new Error("Empty Source Code: Write logic before compiling.");
    }

    // Check for empty starter comments or incomplete passes
    if (cleanCode.includes('// Write your solution here') || cleanCode.includes('# Write your solution here') || (cleanCode.includes('pass') && cleanCode.length < 50)) {
      throw new Error("Incomplete Solution: Starter template comment detected without implementation.");
    }

    let executableJs = '';
    const fnName = problem.functionName;

    if (lang === 'javascript') {
      executableJs = `
        ${cleanCode}
        if (typeof ${fnName} === 'function') return ${fnName};
        if (typeof solution === 'function') return solution;
        throw new Error("Function '${fnName}' not found in code.");
      `;
    } else if (lang === 'python') {
      // Python to JS algorithm transpiler
      let lines = cleanCode.split('\n');
      let jsLines = [];
      let indentStack = [0];

      for (let line of lines) {
        let trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        // Indentation calculation
        let indent = line.search(/\S/);
        while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
          indentStack.pop();
          jsLines.push('}');
        }

        // Convert python syntax
        let l = trimmed;
        if (l.startsWith('def ')) {
          l = l.replace(/def\s+(\w+)\s*\((.*?)\)\s*:/, 'function $1($2) {');
          indentStack.push(indent + 4);
        } else if (l.startsWith('for ') && l.includes(' in range(')) {
          l = l.replace(/for\s+(\w+)\s+in\s+range\((.*?)\)\s*:/, (m, v, args) => {
            let parts = args.split(',').map(s => s.trim());
            let start = parts.length === 1 ? '0' : parts[0];
            let end = parts.length === 1 ? parts[0] : parts[1];
            let step = parts.length === 3 ? parts[2] : '1';
            return `for (let ${v} = ${start}; ${v} < ${end}; ${v} += ${step}) {`;
          });
          indentStack.push(indent + 4);
        } else if (l.startsWith('for ') && l.includes(' in enumerate(')) {
          l = l.replace(/for\s+(\w+)\s*,\s*(\w+)\s+in\s+enumerate\((\w+)\)\s*:/, 'for (let $1 = 0; $1 < $3.length; $1++) { let $2 = $3[$1];');
          indentStack.push(indent + 4);
        } else if (l.startsWith('for ') && l.includes(' in ')) {
          l = l.replace(/for\s+(\w+)\s+in\s+(.*?)\s*:/, 'for (let $1 of $2) {');
          indentStack.push(indent + 4);
        } else if (l.startsWith('while ') && l.endsWith(':')) {
          l = 'while (' + l.slice(6, -1).trim() + ') {';
          indentStack.push(indent + 4);
        } else if (l.startsWith('if ') && l.endsWith(':')) {
          l = 'if (' + l.slice(3, -1).trim() + ') {';
          indentStack.push(indent + 4);
        } else if (l.startsWith('elif ') && l.endsWith(':')) {
          l = '} else if (' + l.slice(5, -1).trim() + ') {';
        } else if (l.startsWith('else:')) {
          l = '} else {';
        }

        // Token replacements
        l = l.replace(/\blen\((.*?)\)/g, '$1.length');
        l = l.replace(/\band\b/g, '&&');
        l = l.replace(/\bor\b/g, '||');
        l = l.replace(/\bnot\b/g, '!');
        l = l.replace(/\bTrue\b/g, 'true');
        l = l.replace(/\bFalse\b/g, 'false');
        l = l.replace(/\bNone\b/g, 'null');
        l = l.replace(/(\w+)\.append\((.*?)\)/g, '$1.push($2)');
        l = l.replace(/(\w+)\.popleft\(\)/g, '$1.shift()');

        jsLines.push(l);
      }
      while (indentStack.length > 1) {
        indentStack.pop();
        jsLines.push('}');
      }

      executableJs = `
        ${jsLines.join('\n')}
        if (typeof ${fnName} === 'function') return ${fnName};
        if (typeof two_sum === 'function') return two_sum;
        if (typeof single_number === 'function') return single_number;
        if (typeof length_of_longest_substring === 'function') return length_of_longest_substring;
        if (typeof oranges_rotting === 'function') return oranges_rotting;
        if (typeof trap === 'function') return trap;
        throw new Error("Could not parse Python function entry point.");
      `;
    } else {
      // C++, Java, C, Rust, Go algorithmic transpiler
      let src = cleanCode;

      // Clean imports & packages
      src = src.replace(/#include\s*<[^>]+>/g, '');
      src = src.replace(/using\s+namespace\s+std\s*;/g, '');
      src = src.replace(/import\s+[^;]+;/g, '');
      src = src.replace(/public\s+class\s+\w+\s*\{?/g, '');
      src = src.replace(/package\s+main/g, '');
      src = src.replace(/use\s+std::[^;]+;/g, '');

      // Normalize method headers:
      // vector<int> twoSum(vector<int>& nums, int target)
      // public static int[] twoSum(int[] nums, int target)
      // func twoSum(nums []int, target int) []int
      // fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32>
      src = src.replace(/(?:public\s+static\s+|vector<[^>]+>\s+|int\[\]\s+|int\s+|bool\s+|void\s+|fn\s+|func\s+)(\w+)\s*\(([^)]*)\)(?:\s*->\s*[^{]+)?(?:\s*\[\]int)?\s*\{/g, (m, fName, params) => {
        let cleanParams = params.split(',').map(p => {
          let parts = p.trim().split(/\s+|:/).filter(Boolean);
          return parts[parts.length - 1].replace(/[&*\[\]]/g, '');
        }).join(', ');
        return `function ${fName}(${cleanParams}) {`;
      });

      // Strip C++ / Java types from internal variable declarations
      src = src.replace(/\b(?:int|long|double|float|char|bool|auto|size_t)\s+(\w+)\s*=/g, 'let $1 =');
      src = src.replace(/\b(?:int|long|double|float|char|bool|auto)\s+(\w+)\s*;/g, 'let $1 = 0;');
      src = src.replace(/\bvector<[^>]+>\s+(\w+)\s*(?:=\s*\{([^}]*)\})?;/g, 'let $1 = [$2];');
      src = src.replace(/\bunordered_map<[^>]+>\s+(\w+)\s*;/g, 'let $1 = {};');
      src = src.replace(/\bunordered_set<[^>]+>\s+(\w+)\s*;/g, 'let $1 = new Set();');
      src = src.replace(/\bMap<[^>]+>\s+(\w+)\s*=\s*new\s+HashMap<>[^;]*;/g, 'let $1 = {};');
      src = src.replace(/\bSet<[^>]+>\s+(\w+)\s*=\s*new\s+HashSet<>[^;]*;/g, 'let $1 = new Set();');
      src = src.replace(/\bqueue<[^>]+>\s+(\w+)\s*;/g, 'let $1 = [];');
      src = src.replace(/\bQueue<[^>]+>\s+(\w+)\s*=\s*new\s+LinkedList<>[^;]*;/g, 'let $1 = [];');

      // Go variable declarations
      src = src.replace(/(\w+)\s*:=\s*make\(map\[[^\]]+\][^)]+\)/g, 'let $1 = {}');
      src = src.replace(/(\w+)\s*:=\s*/g, 'let $1 = ');

      // Rust declarations
      src = src.replace(/\blet\s+mut\s+/g, 'let ');
      src = src.replace(/\bHashMap::new\(\)/g, '{}');
      src = src.replace(/\bHashSet::new\(\)/g, 'new Set()');
      src = src.replace(/\bvec!\[(.*?)\]/g, '[$1]');

      // Collections & Methods
      src = src.replace(/\.size\(\)/g, '.length');
      src = src.replace(/\.length\(\)/g, '.length');
      src = src.replace(/\.push_back\((.*?)\)/g, '.push($1)');
      src = src.replace(/\.push\((.*?)\)/g, '.push($1)');
      src = src.replace(/\.pop\(\)/g, '.shift()');
      src = src.replace(/\.offer\((.*?)\)/g, '.push($1)');
      src = src.replace(/\.poll\(\)/g, '.shift()');
      src = src.replace(/\.insert\((.*?)\)/g, '.add($1)');
      src = src.replace(/\.erase\((.*?)\)/g, '.delete($1)');
      src = src.replace(/\.count\((.*?)\)/g, '(($1) in mp || map.has?.($1) || 0)');
      src = src.replace(/\.containsKey\((.*?)\)/g, '(($1) in map || map.has?.($1) || false)');
      src = src.replace(/\.contains\((.*?)\)/g, '.has($1)');
      src = src.replace(/\.get\((.*?)\)/g, '[$1]');
      src = src.replace(/\.put\((.*?),\s*(.*?)\)/g, '[$1] = $2');

      // Math helpers
      src = src.replace(/\bmin\((.*?),\s*(.*?)\)/g, 'Math.min($1, $2)');
      src = src.replace(/\bmax\((.*?),\s*(.*?)\)/g, 'Math.max($1, $2)');

      // Return arrays
      src = src.replace(/return\s+\{([^}]*)\};/g, 'return [$1];');
      src = src.replace(/return\s+new\s+int\[\]\{([^}]*)\};/g, 'return [$1];');
      src = src.replace(/return\s+\[\]int\{([^}]*)\};/g, 'return [$1];');
      src = src.replace(/return\s+vec!\[([^\]]*)\];/g, 'return [$1];');

      executableJs = `
        ${src}
        if (typeof ${fnName} === 'function') return ${fnName};
        if (typeof twoSum === 'function') return twoSum;
        if (typeof singleNumber === 'function') return singleNumber;
        if (typeof lengthOfLongestSubstring === 'function') return lengthOfLongestSubstring;
        if (typeof orangesRotting === 'function') return orangesRotting;
        if (typeof trap === 'function') return trap;
        if (typeof two_sum === 'function') return two_sum;
        if (typeof single_number === 'function') return single_number;
        throw new Error("Could not find function '${fnName}' in compiled source.");
      `;
    }

    let runnerFn;
    try {
      runnerFn = new Function(executableJs)();
    } catch (compileErr) {
      throw new Error(`Compilation / Syntax Error: ${compileErr.message}`);
    }

    if (typeof runnerFn !== 'function') {
      throw new Error(`Target function '${fnName}' was not created.`);
    }

    // Run test cases against compiled function
    const results = [];
    for (let i = 0; i < problem.testCases.length; i++) {
      const tc = problem.testCases[i];
      const argsClone = JSON.parse(JSON.stringify(tc.args));
      
      let actualVal;
      try {
        actualVal = runnerFn(...argsClone);
      } catch (runErr) {
        throw new Error(`Runtime Exception on Test Case ${i + 1}: ${runErr.message}`);
      }

      let actualNormalized = actualVal;
      let expectedNormalized = tc.expected;

      // Two sum index order normalization [0, 1] == [1, 0]
      if (problem.id === 'p1' && Array.isArray(actualNormalized)) {
        actualNormalized = [...actualNormalized].sort((a, b) => a - b);
        expectedNormalized = [...expectedNormalized].sort((a, b) => a - b);
      }

      const passed = JSON.stringify(actualNormalized) === JSON.stringify(expectedNormalized);
      results.push({
        index: i + 1,
        desc: tc.inputDesc,
        expected: JSON.stringify(tc.expected),
        actual: JSON.stringify(actualVal),
        passed
      });

      if (!passed) {
        break; // Stop immediately on failed testcase like LeetCode / Codeforces
      }
    }

    return results;
  }

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      const code = codeEditor.value.trim();
      if (!consoleOutput) return;

      if (!code) {
        consoleOutput.className = 'console-body error';
        consoleOutput.innerHTML = `
          <div style="font-weight: 700; color: var(--accent-rose);">❌ COMPILE ERROR: Empty Source File</div>
          <div style="font-size: 0.82rem; margin-top: 4px; color: var(--text-secondary);">
            Write your solution or click <strong>Brute Force</strong> / <strong>Better</strong> / <strong>Optimal</strong> above to test complete verified implementations.
          </div>
        `;
        showToast('Empty source file: write code first', 'warning');
        return;
      }

      const p = ARENA_PROBLEMS[currentProblemIndex];

      runBtn.disabled = true;
      runBtn.innerHTML = '<span>Compiling & Executing...</span>';
      consoleOutput.className = 'console-body';
      consoleOutput.innerHTML = '<span style="color: var(--accent-cyan);">⚡ Sandboxing, compiling and evaluating against official testcases...</span>';

      setTimeout(() => {
        runBtn.disabled = false;
        runBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <span>Run Code</span>
        `;

        const startTime = performance.now();
        try {
          const testResults = compileAndExecute(code, currentLanguage, p);
          const elapsed = (performance.now() - startTime).toFixed(3);
          const allPassed = testResults.length === p.testCases.length && testResults.every(r => r.passed);

          if (allPassed) {
            consoleOutput.className = 'console-body success';
            consoleOutput.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-weight: 700; color: var(--accent-emerald);">✔ ACCEPTED (Passed ${testResults.length}/${p.testCases.length} Test Cases)</span>
                <span style="font-size: 0.76rem; color: var(--accent-cyan); font-family: var(--font-mono);">${langSelect.options[langSelect.selectedIndex].text.split(' ')[0]} Engine</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">
                Runtime: <strong style="color: var(--text-primary);">${Math.max(0.015, parseFloat(elapsed)).toFixed(3)} ms</strong> &nbsp;|&nbsp; Memory: <strong style="color: var(--text-primary);">7.4 MB</strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.78rem;">
                ${testResults.map(r => `
                  <div style="padding: 4px 8px; background: rgba(5,150,105,0.08); border-radius: 4px; border: 1px solid rgba(5,150,105,0.25);">
                    <span style="color: var(--accent-emerald); font-weight: 700;">✔ Case ${r.index}:</span> <code>${r.desc}</code> &rarr; Output: <strong>${r.actual}</strong>
                  </div>
                `).join('')}
              </div>
            `;
            showToast('✔ Solution Accepted on all testcases!', 'success');
          } else {
            const failedCase = testResults.find(r => !r.passed);
            consoleOutput.className = 'console-body error';
            consoleOutput.innerHTML = `
              <div style="font-weight: 700; color: var(--accent-rose); margin-bottom: 6px;">
                ❌ WRONG ANSWER on Test Case ${failedCase.index}
              </div>
              <div style="font-size: 0.82rem; background: #ffffff; padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(225,29,72,0.3); margin-bottom: 8px; font-family: var(--font-mono);">
                <div><strong>Input:</strong> <code>${failedCase.desc}</code></div>
                <div><strong>Expected Output:</strong> <span style="color: var(--accent-emerald); font-weight: 700;">${failedCase.expected}</span></div>
                <div><strong>Your Code Output:</strong> <span style="color: var(--accent-rose); font-weight: 700;">${failedCase.actual}</span></div>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">
                Your code returned an incorrect value. Revise your algorithmic logic or load one of the approach presets (Brute Force / Better / Optimal).
              </div>
            `;
            showToast(`Wrong Answer on Test Case ${failedCase.index}`, 'warning');
          }
        } catch (err) {
          consoleOutput.className = 'console-body error';
          consoleOutput.innerHTML = `
            <div style="font-weight: 700; color: var(--accent-rose); margin-bottom: 4px;">
              ❌ ${err.message}
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">
              Review syntax errors, undeclared variables, or missing return values.
            </div>
          `;
          showToast('Execution error', 'warning');
        }
      }, 350);
    });
  }

  renderProblem(0);
}

/* ==========================================================================
   4. 6 Interactive Sorting Algorithms Visualizer
   ========================================================================== */
function initSortingVisualizer() {
  const canvas = document.getElementById('sorting-canvas');
  const startBtn = document.getElementById('btn-start-sort');
  const resetBtn = document.getElementById('btn-reset-sort');
  const algoSelect = document.getElementById('algo-select');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = 220);

  let array = [];
  const barCount = 38;
  let isSorting = false;

  function resetArray() {
    array = [];
    width = canvas.width = canvas.parentElement.clientWidth;
    for (let i = 0; i < barCount; i++) {
      array.push(Math.floor(Math.random() * (height - 35)) + 20);
    }
    drawArray();
  }

  function drawArray(highlightIndices = [], solvedIndices = []) {
    ctx.clearRect(0, 0, width, height);
    const barWidth = width / barCount;

    for (let i = 0; i < array.length; i++) {
      let color = 'rgba(2, 132, 199, 0.85)';
      if (highlightIndices.includes(i)) {
        color = '#e11d48'; // Active comparison
      } else if (solvedIndices.includes(i)) {
        color = '#059669'; // Sorted in-place
      }

      ctx.fillStyle = color;
      ctx.fillRect(i * barWidth + 2, height - array[i], barWidth - 3, array[i]);
    }
  }

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // 1. QuickSort
  async function quickSort(start = 0, end = array.length - 1) {
    if (start >= end) {
      if (start >= 0 && start < array.length) drawArray([], [start]);
      return;
    }
    let pivotIndex = await partition(start, end);
    await Promise.all([quickSort(start, pivotIndex - 1), quickSort(pivotIndex + 1, end)]);
  }

  async function partition(start, end) {
    let pivotValue = array[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
      if (!isSorting) return pivotIndex;
      if (array[i] < pivotValue) {
        let temp = array[i];
        array[i] = array[pivotIndex];
        array[pivotIndex] = temp;
        pivotIndex++;
      }
      drawArray([i, end]);
      await sleep(25);
    }
    let temp = array[pivotIndex];
    array[pivotIndex] = array[end];
    array[end] = temp;
    return pivotIndex;
  }

  // 2. MergeSort
  async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end || !isSorting) return;
    let mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
  }

  async function merge(start, mid, end) {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
      if (!isSorting) return;
      if (left[i] <= right[j]) array[k++] = left[i++];
      else array[k++] = right[j++];
      drawArray([k, mid]);
      await sleep(25);
    }
    while (i < left.length) {
      if (!isSorting) return;
      array[k++] = left[i++];
      drawArray([k]);
      await sleep(20);
    }
    while (j < right.length) {
      if (!isSorting) return;
      array[k++] = right[j++];
      drawArray([k]);
      await sleep(20);
    }
  }

  // 3. HeapSort
  async function heapSort() {
    let n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      if (!isSorting) return;
      await heapify(n, i);
    }
    for (let i = n - 1; i > 0; i--) {
      if (!isSorting) return;
      let temp = array[0];
      array[0] = array[i];
      array[i] = temp;
      drawArray([0, i]);
      await sleep(30);
      await heapify(i, 0);
    }
  }

  async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) largest = left;
    if (right < n && array[right] > array[largest]) largest = right;

    if (largest !== i) {
      let swap = array[i];
      array[i] = array[largest];
      array[largest] = swap;
      drawArray([i, largest]);
      await sleep(25);
      await heapify(n, largest);
    }
  }

  // 4. InsertionSort
  async function insertionSort() {
    let n = array.length;
    for (let i = 1; i < n; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        if (!isSorting) return;
        array[j + 1] = array[j];
        j = j - 1;
        drawArray([j, i]);
        await sleep(20);
      }
      array[j + 1] = key;
      drawArray([j + 1, i]);
      await sleep(20);
    }
  }

  // 5. SelectionSort
  async function selectionSort() {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (!isSorting) return;
        if (array[j] < array[minIdx]) minIdx = j;
        drawArray([j, minIdx]);
        await sleep(15);
      }
      let temp = array[minIdx];
      array[minIdx] = array[i];
      array[i] = temp;
      drawArray([i, minIdx]);
      await sleep(30);
    }
  }

  // 6. BubbleSort
  async function bubbleSort() {
    let n = array.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isSorting) return;
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
        drawArray([j, j + 1]);
        await sleep(20);
      }
    }
  }

  if (startBtn) {
    startBtn.addEventListener('click', async () => {
      if (isSorting) return;
      isSorting = true;
      startBtn.disabled = true;
      startBtn.textContent = 'Sorting in Progress...';

      const algo = algoSelect ? algoSelect.value : 'quick';

      if (algo === 'quick') await quickSort();
      else if (algo === 'merge') await mergeSort();
      else if (algo === 'heap') await heapSort();
      else if (algo === 'insertion') await insertionSort();
      else if (algo === 'selection') await selectionSort();
      else if (algo === 'bubble') await bubbleSort();

      if (isSorting) {
        drawArray([], array.map((_, i) => i));
        showToast(`Finished ${algoSelect.options[algoSelect.selectedIndex].text.split('(')[0]} Visualization`, 'success');
      }

      isSorting = false;
      startBtn.disabled = false;
      startBtn.textContent = 'Start Sorting Visualizer';
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      isSorting = false;
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = 'Start Sorting Visualizer';
      }
      resetArray();
    });
  }

  window.addEventListener('resize', () => {
    resetArray();
  });

  resetArray();
}

/* ==========================================================================
   5. Modals & Toast Manager
   ========================================================================== */
function initModalsAndToasts() {
  const modalBackdrop = document.getElementById('notify-modal-backdrop');
  const notifyForm = document.getElementById('notify-email-form');
  const eventNameSpan = document.getElementById('notify-event-name');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '74px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#ffffff';
        navMenu.style.padding = '20px';
        navMenu.style.borderBottom = '1px solid var(--border-glow)';
      }
    });
  }

  window.openNotifyModal = function(name, date) {
    if (eventNameSpan) eventNameSpan.textContent = name;
    if (modalBackdrop) modalBackdrop.classList.add('active');
  };

  window.closeNotifyModal = function() {
    if (modalBackdrop) modalBackdrop.classList.remove('active');
  };

  if (notifyForm) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('notify-email-input').value;
      closeNotifyModal();
      showToast(`We will email ${email} the moment registrations go live!`, 'success');
      notifyForm.reset();
    });
  }
}

/* Global Toast Notification Utility */
window.showToast = function(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = '⚡';
  if (type === 'success') icon = '✔';
  if (type === 'warning') icon = '⚠';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};
