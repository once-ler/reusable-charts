/* @flow */
export const createGrid = showreel => () => {

  d3.select('#grid').node().innerHTML =
    `<div id="clusterize-grid" class="clusterize not-visible">
      <table>
        <thead>
          <tr>
          </tr>
        </thead>
      </table>
      <div id="scrollArea" class="clusterize-scroll">
        <table>
          <tbody id="contentArea" class="clusterize-content">
            <tr class="clusterize-no-data">
              <td>Loading data…</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`

  setTimeout(() => {
    showreel.clusterize = new Clusterize({
      scrollId: 'scrollArea',
      contentId: 'contentArea',
      rows_in_block: 10
    })
  }, 400)
}
