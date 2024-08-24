<template>
  <div id="container"></div>
</template>

<script>
import { Graph } from '@antv/g6';
export default {
  name: "startG6",
  created() { 
   
  },
  mounted() {
    this.initG6()
  },
  methods: {
    initG6() {
      // 准备数据
      const data = {
                 nodes: [{
                     id: 'node1',
                     x: 200,
                     y: 200
                 }, {
                     id: 'node2',
                     x: 300,
                     y: 200
                 }],
                 edges: [{
                     id: 'edge1',
                     target: 'node2',
                     source: 'node1'
                 }]
             };
     
      const graph = new Graph({
        container: 'container',
        width: 500,
        height: 500,
        data,
        node: {
          palette: {
            type: 'group',
            field: 'cluster',
          },
        },
        layout: {
          type: 'force',
        },
        behaviors: ['drag-canvas', 'drag-node'],
      });

    
      graph.render();
    }
  }
}
</script>
