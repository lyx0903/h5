<template>
  <div class="warp">
    <div class="banner animate__animated animate__bounceIn"></div>
    <h2>
      <div class="text"></div>
      <div class="orn"></div>
    </h2>
    <div class="music-list">
      <ul>
        <li v-for="(item, index) in musicList" :key="index" :class="{'playing' : item.playState}">
          <div class="info">
            <h3>{{item.musicName}}</h3>
            <p>{{item.singer}}</p>
          </div>
          <div class="btn" @click="playCur(item)">
            <img v-show="!item.playState" src="@/assets/svg/bf.svg" alt="">
            <img v-show="item.playState" src="@/assets/svg/zt.svg" alt="">
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="footer"></div> -->
    <audio ref="audioDom" @ended="musicEnd"></audio>
  </div>
</template>

<script>

export default {
  name: 'MusicList',
  data() {
    return {
      musicList: [
        { id: '1', musicName: '落在生命里的光', singer: '尹昔眠', mp3Url: 'music/落在生命里的光.mp3', playState: false},
        { id: '3', musicName: '夏天的风', singer: '蓝心羽', mp3Url: 'music/夏天的风.mp3', playState: false},
        { id: '4', musicName: '遇到', singer: '方雅贤', mp3Url: 'music/遇到.mp3', playState: false},
        { id: '5', musicName: '白月光与朱砂痣', singer: '高心悦', mp3Url: 'music/白月光与朱砂痣.mp3', playState: false},
        { id: '6', musicName: '起风了', singer: '买辣椒也用券', mp3Url: 'music/起风了.mp3', playState: false},
        { id: '7', musicName: '来自天堂的魔鬼', singer: '宋瑞', mp3Url: 'music/来自天堂的魔鬼.mp3', playState: false},
        { id: '8', musicName: '没有共产党就没有新中国', singer: '华语群星', mp3Url: 'music/没有共产党就没有新中国.mp3', playState: false},
        { id: '9', musicName: '白月光与朱砂痣', singer: '高心悦', mp3Url: 'music/白月光与朱砂痣.mp3', playState: false},
        { id: '10', musicName: '起风了', singer: '买辣椒也用券', mp3Url: 'music/起风了.mp3', playState: false},
        { id: '2', musicName: '同桌的你', singer: '老狼', mp3Url: 'music/同桌的你.mp3', playState: false},
      ],
    }
  },
  methods: {
    // 播放
    playCur(row){
      console.log(row);
      if(row.playState){
        row.playState = false;
        this.$refs.audioDom.pause();
      } else {
        row.playState = true;
        this.$refs.audioDom.src = row.mp3Url;
        this.$refs.audioDom.play();
        this.musicList.forEach(item => {
          if(item.id != row.id){
            item.playState = false;
          }
        })
      }
    },
    musicEnd() {
      this.musicList.forEach(item => {
        item.playState = false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.warp{
  color: #fff;
  background-color: #33318c;
  background-image: url(~@/assets/images/music/bg.jpg),url(~@/assets/images/music/footer.jpg);
  padding-top: 2.2rem;
  padding-bottom: 4rem;
  background-size: 100%;
  background-repeat: no-repeat, no-repeat;
  background-position: top, bottom;
  .banner{
    width: 9.32rem;
    height: 5.55rem;
    background-image: url(~@/assets/images/music/banner.png);
    background-size: 100% 100%;
    margin: 0 auto 1rem 1rem;
  }

  h2{
    width: 3.04rem;
    height: 0.82rem;
    line-height: 0.82rem;
    text-align: center;
    background-image: linear-gradient(to right, #5d49f2 , #e275ff);
    border-radius: 0.57rem;
    margin: 0 auto 0.66rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0.03px 0.07px 0px rgba(10, 9, 87, 0.3);
    position: relative;
    .text{
      width: 1.97rem;
      height: 0.4rem;
      background-image: url(~@/assets/images/music/h2_bg.png);
      background-size: 100% 100%;
    }
    .orn{
      width: 0.76rem;
      height: 1.19rem;
      background-image: url(~@/assets/images/music/orn.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.15rem;
      left: -0.3rem;
    }
  }
  .music-list{
    margin: 0 auto;
    width: 9.38rem;
    ul{
      li{
        margin-bottom: 0.5rem;
        border-radius: 0.3rem;
        padding: 0.3rem 0.5rem;
        // background-image: linear-gradient(to right, #372fd2 , #2a23b0);
        background-image: linear-gradient(to right, #5a37e5 , #6a45ff);
        box-shadow: 0px 0.03px 0.07px 0px rgba(10, 9, 87, 0.3);
        position: relative;
        transition: all 0.5s;
        .info{
          h3{
            font-size: 0.48rem;
            margin-bottom: 0.1rem;
          }
          p{
            font-size: 0.36rem;
            opacity: 0.6;
          }
        }
        .btn{
          position: absolute;
          right: 0.3rem;
          top: 0.4rem;
          width: 1.2rem;
          height: 1.2rem;
          img{
            width: 100%;
            height: 100%;
            border: none;
          }
        }
        &:last-child{
          margin-bottom: 0;
        }
      }
      .playing{
        background-image: linear-gradient(to right, #7b6afc , #e278ff);
      }
    }
  }
  // .footer{
  //   height: 6rem;
  //   // background-image: url(~@/assets/images/music/footer.jpg);
  //   background-size: 100% 100%;
  // }
}
</style>
