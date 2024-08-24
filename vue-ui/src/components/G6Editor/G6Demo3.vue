<template>
    <div id="mountNode"></div>
</template>

<script>
import G6 from '@antv/g6';
export default {
    name: "startG6",
    created() { //不能在created方法中初始化
        //this.initG6()
    },
    mounted() {
        this.initG6()
    },
    methods: {
        initG6() {
            const data = {
                nodes: [
                    {
                        id: 'node1',
                        label: 'Circle1',
                        x: 150,
                        y: 150,
                    },
                    {
                        id: 'node2',
                        label: 'Circle2',
                        x: 400,
                        y: 150,
                    },
                ],
                edges: [
                    {
                        source: 'node1',
                        target: 'node2',
                    },
                ],
            };

            const graph = new G6.Graph({
                container: 'mountNode',
                width: 500,
                height: 500,
                defaultNode: {
                    type: 'circle',
                    size: [100],
                    color: '#5B8FF9',
                    style: {
                        fill: '#9EC9FF',
                        lineWidth: 3,
                    },
                    labelCfg: {
                        style: {
                            fill: '#fff',
                            fontSize: 20,
                        },
                    },
                },
                defaultEdge: {
                    style: {
                        stroke: '#e2e2e2',
                    },
                },
            });

            graph.data(data);
            graph.render();
        }
    }
}
</script>