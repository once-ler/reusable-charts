/* @flow */

const csv = `<tr><td style="width: 60px;">0</td><td style="width: 160px;">2019-02-05T15:21:09.006590</td><td style="width: 160px;">store_abc</td><td style="width: 160px;">store_def</td><td style="width: 160px;">19-99989</td><td style="width: 160px;"></td><td style="width: 160px;">some_proc</td><td style="width: 300px;" class="text">Some error and stack trace\nblah blah\n...</td></tr>
<tr><td style="width: 60px;">1</td><td style="width: 160px;">2019-02-05T15:21:09.006590</td><td style="width: 160px;">store_abc</td><td style="width: 160px;">store_def</td><td style="width: 160px;">19-99990</td><td style="width: 160px;"></td><td style="width: 160px;">some_proc</td><td style="width: 300px;" class="text">Some error and stack trace\nblah blah\n...</td></tr>
<tr><td style="width: 60px;">2</td><td style="width: 160px;">2019-02-05T15:21:09.006590</td><td style="width: 160px;">store_abc</td><td style="width: 160px;">store_def</td><td style="width: 160px;">19-99991</td><td style="width: 160px;"></td><td style="width: 160px;">some_proc</td><td style="width: 300px;" class="text">Some error and stack trace\nblah blah\n...</td></tr>
<tr><td style="width: 60px;">3</td><td style="width: 160px;">2019-02-05T15:21:09.006590</td><td style="width: 160px;">store_abc</td><td style="width: 160px;">store_def</td><td style="width: 160px;">19-99992</td><td style="width: 160px;"></td><td style="width: 160px;">some_proc</td><td style="width: 300px;" class="text">Some error and stack trace\nblah blah\n...</td></tr>
<tr><td style="width: 60px;">4</td><td style="width: 160px;">2019-02-05T15:21:09.006590</td><td style="width: 160px;">store_abc</td><td style="width: 160px;">store_def</td><td style="width: 160px;">19-99993</td><td style="width: 160px;"></td><td style="width: 160px;">some_proc</td><td style="width: 300px;" class="text">Some error and stack trace\nblah blah\n...</td></tr>
<tr><td style="width: 60px;">5</td><td style="width: 160px;">2019-02-05T15:21:09.006590</td><td style="width: 160px;">store_abc</td><td style="width: 160px;">store_def</td><td style="width: 160px;">19-99994</td><td style="width: 160px;"></td><td style="width: 160px;">some_proc</td><td style="width: 300px;" class="text">Some error and stack trace\nblah blah\n...</td></tr>
<tr><td style="width: 60px;">6</td><td style="width: 160px;">2019-02-05T15:21:09.006590</td><td style="width: 160px;">store_abc</td><td style="width: 160px;">store_def</td><td style="width: 160px;">19-99995</td><td style="width: 160px;"></td><td style="width: 160px;">some_proc</td><td style="width: 300px;" class="text">Some error and stack trace\nblah blah\n...</td></tr>
<tr><td style="width: 60px;">7</td><td style="width: 160px;">2019-02-05T15:21:09.006590</td><td style="width: 160px;">store_abc</td><td style="width: 160px;">store_def</td><td style="width: 160px;">19-99996</td><td style="width: 160px;"></td><td style="width: 160px;">some_proc</td><td style="width: 300px;" class="text">Some error and stack trace\nblah blah\n...</td></tr>
<tr><td style="width: 60px;">8</td><td style="width: 160px;">2019-02-05T15:21:09.006590</td><td style="width: 160px;">store_abc</td><td style="width: 160px;">store_def</td><td style="width: 160px;">19-99997</td><td style="width: 160px;"></td><td style="width: 160px;">some_proc</td><td style="width: 300px;" class="text">Some error and stack trace\nblah blah\n...</td></tr>
<tr><td style="width: 60px;">9</td><td style="width: 160px;">2019-02-05T15:21:09.006590</td><td style="width: 160px;">store_abc</td><td style="width: 160px;">store_def</td><td style="width: 160px;">19-99998</td><td style="width: 160px;"></td><td style="width: 160px;">some_proc</td><td style="width: 300px;" class="text">Some error and stack trace\nblah blah\n...</td></tr>
`

const dset = csv.split('\n')

export const getStatic = showreel => search => {

  const processCallback = () => process(dset)

  const process = res => {
    const h = `<tr>
      <th style="width: 60px;">ROW</th>
      <th style="width: 160px;">DATE</th>
      <th style="width: 160px;">FROM</th>
      <th style="width: 160px;">TO</th>
      <th style="width: 160px;">STUDY</th>
      <th style="width: 160px;">WSI</th>
      <th style="width: 160px;">CALLER</th>
      <th style="width: 300px;" class="text">RESPONSE</th>
      </tr>`

    const th = document.querySelector('.clusterize table thead tr')
    th.innerHTML = `${h}`

    showreel.clusterize.update(res)
    setTimeout(() => NProgress.done(), 200)
  }

  const fetchStatic = search => {
    showreel.clusterize.clear()
    NProgress.start()
    setTimeout(processCallback, 2000)
  }

  fetchStatic(search)

}