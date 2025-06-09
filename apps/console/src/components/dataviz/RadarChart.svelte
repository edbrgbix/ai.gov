<script lang="ts">
  export let data = [];

  const categories = ["Business", "Coding", "Reading Comprehension", "Safeguards", "FAR"];
  const angleSlice = (2 * Math.PI) / categories.length;
  const maxRadius = 100;

  function getPoints(scores: Record<string, number>) {
    return categories.map((key, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const value = scores[key] ?? 0;
      const r = (value / 100) * maxRadius;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(" ");
  }

  const colors = [
    { fill: "rgba(0, 123, 255, 0.3)", stroke: "#007bff" },
    { fill: "rgba(255, 99, 132, 0.3)", stroke: "#ff6384" },
    { fill: "rgba(75, 192, 192, 0.3)", stroke: "#4bc0c0" }
  ];
</script>

<figure role="group" aria-labelledby="chartTitle chartDesc">
  <figcaption id="chartDesc" class="usa-sr-only">
    Radar chart comparing AI models across five evaluation categories.
  </figcaption>

  <svg 
    viewBox="0 0 200 280" 
    width="280" 
    height="280" 
    role="img"
    preserveAspectRatio="xMinYMin meet"
    aria-labelledby="chartTitle chartDesc"
  >
    <title id="chartTitle">Model Comparison Radar Chart</title>
    <g transform="translate(150, 150)">
    <!-- Axes -->
    <g stroke="#ccc">
      {#each categories as _, i}
        <line
          x1="0"
          y1="0"
          x2={100 * Math.cos(i * angleSlice - Math.PI / 2)}
          y2={100 * Math.sin(i * angleSlice - Math.PI / 2)}
        />
      {/each}
    </g>

    <!-- Labels -->
    {#each categories as label, i}
      <text
        x={(115 * Math.cos(i * angleSlice - Math.PI / 2)).toFixed(2)}
        y={(115 * Math.sin(i * angleSlice - Math.PI / 2)).toFixed(2)}
        text-anchor="middle"
        font-size="10"
      >
        {label}
      </text>
    {/each}

    {#each Array(5) as _, level}
      <polygon
        stroke="#eee"
        fill="none"
        stroke-width="1"
        points={
          categories
            .map((_, i) => {
              const angle = i * angleSlice - Math.PI / 2;
              const r = ((level + 1) / 5) * maxRadius;
              const x = r * Math.cos(angle);
              const y = r * Math.sin(angle);
              return `${x.toFixed(2)},${y.toFixed(2)}`;
            })
            .join(" ")
        }
      />
    {/each}

    <!-- Data Polygons -->
    {#each data as model, i}
      <polygon
        points={getPoints(model.scores)}
        fill="none"
        stroke={colors[i % colors.length].stroke}
        stroke-width="2
        "
      />
    {/each}
  </g>
  </svg>
</figure>

<ul class="radar-legend">
  <li>
    <span class="legend-swatch" style="background-color: #007bff"></span> Haiku 3.5
  </li>
  <li>
    <span class="legend-swatch" style="background-color: #ff6384"></span> Sonnet 3.5
  </li>
  <li>
    <span class="legend-swatch" style="background-color: #22c55e"></span> LLama 3.2 (11B)
  </li>
</ul>

<style>
  .radar-legend {
    list-style: none;
    padding: 0;
    margin: 0; 
    display: flex;
    gap: 1.5rem;
    font-size: 0.875rem;
    align-items: center;
    li {
      display: flex; 
      align-content: center;
    }
  }
  .legend-swatch {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    border-radius: 2px;
  }
  figure,
  svg {
    margin: 0;
    padding: 0;
  }
</style>
