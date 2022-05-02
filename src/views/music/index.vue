<template>
  <div class="warp">
    <div class="banner animate__animated animate__bounceIn"></div>
    <h2>
      <div class="text"></div>
      <!-- <div class="orn"></div> -->
    </h2>
    <div class="tools">
      <img :class="{'active': curMode === 1}" src="@/assets/svg/sx.svg" @click="modeChange(1)" />
      <img :class="{'active': curMode === 2}" src="@/assets/svg/sj.svg" @click="modeChange(2)" />
      <img :class="{'active': curMode === 3}" src="@/assets/svg/xh.svg" @click="modeChange(3)" />
    </div>
    <div class="music-list">
      <ul>
        <li
          v-for="(item, index) in musicList"
          :key="index"
          :class="{ playing: item.playState }"
        >
          <div class="info">
            <h3>{{ item.musicName }}</h3>
            <p>{{ item.singer }}</p>
          </div>
          <div class="btn" @click="playCur(item)">
            <img v-show="item.playState === 0" src="@/assets/svg/bf.svg" alt="" />
            <img v-show="item.playState === 2" src="@/assets/svg/bf2.svg" alt="" />
            <img v-show="item.playState === 1" src="@/assets/svg/zt.svg" alt="" />
          </div>
          <template v-if="item.playState === 1 || item.playState === 2">
            <div class="progress">
              <van-slider v-model="curProgress" @change="sliderChange" button-size="0.3rem" bar-height="0.1rem" active-color="#fff" inactive-color="rgba(255,255,255, 0.3)" />
            </div>
            <div class="time clearfix">
              <span class="left">{{ curTime }}</span>
              <span class="right">{{ allTime }}</span>
            </div>
          </template>
        </li>
      </ul>
    </div>
    <!-- <div class="footer"></div> -->
    <audio ref="audioDom" @ended="musicEnd" @canplay="onPlay"></audio>
  </div>
</template>


<script>
export default {
  name: "MusicList",
  data() {
    return {
      audioDom: null,
      musicList: [
        {
          id: "1",
          musicName: "水星记",
          singer: "技术三部 杨子超",
          mp3Url: "music/水星记.mp3",
          playState: 0,
        },
        {
          id: "2",
          musicName: "城",
          singer: "业务研发四部 段启深",
          mp3Url: "music/城.mp3",
          playState: 0,
        },
        {
          id: "3",
          musicName: "我爱你不问归期",
          singer: "用户体验部 金鑫",
          mp3Url: "music/我爱你不问归期.mp3",
          playState: 0,
        },
        {
          id: "4",
          musicName: "最重要的决定",
          singer: "业务研发三部 崔照欣",
          mp3Url: "music/最重要的决定.mp3",
          playState: 0,
        },
        {
          id: "5",
          musicName: "东北民谣",
          singer: "业务架构管理部 马芳琳",
          mp3Url: "music/东北民谣.mp3",
          playState: 0,
        },
        {
          id: "6",
          musicName: "雪の華",
          singer: "业务架构管理部 达之玢",
          mp3Url: "music/雪の華.m4a",
          playState: 0,
        },
        {
          id: "7",
          musicName: "Love Paradise",
          singer: "业务研发四部 秦子瑜",
          mp3Url: "music/Love Paradise.mp3",
          playState: 0,
        },
        {
          id: "8",
          musicName: "勇气",
          singer: "业务研发三部 付佳",
          mp3Url: "music/勇气.m4a",
          playState: 0,
        },
        {
          id: "9",
          musicName: "我害怕",
          singer: "技术三部 韩英奇",
          mp3Url: "music/我害怕.mp3",
          playState: 0,
        },
        {
          id: "10",
          musicName: "想见你想见你想见你",
          singer: "业务研发三部 陈田蕊",
          mp3Url: "music/想见你想见你想见你.mp3",
          playState: 0,
        },
      ],
      curMode: 1,
      curProgress: 0,
      curTime: "00:00",
      allTime: "00:00",
      timer: null,
      curMusic: null,
    };
  },
  mounted() {
    // setTimeout(() => {
      this.audioDom = this.$refs.audioDom;
      // this.playCur(this.musicList[0]);
    // }, 500)
    
  },
  methods: {
    // 播放
    playCur(row) {
      console.log(row);
      this.curMusic = row;
      if (row.playState === 1) {
        // 停止
        row.playState = 2;
        this.audioDom.pause();
      } else if(row.playState === 2){
        // 暂停
        row.playState = 1;
        this.audioDom.play();
      } else {
        // 播放
        this.curTime = '00:00';
        this.curProgress = 0;
        row.playState = 1;
        this.audioDom.src = row.mp3Url;
        this.audioDom.play();
        this.musicList.forEach((item) => {
          if (item.id != row.id) {
            item.playState = 0;
          }
        });
        this.$nextTick(() => {
          this.getCurTime();
        })
      }
    },
    sliderChange(val){
      this.audioDom.currentTime = this.audioDom.duration*(val/100);
    },
    onPlay() {
      console.log(this.audioDom.duration);
      this.allTime = this.audioTimeTransform(this.audioDom.duration);
    },
    getCurTime() {
      this.timer = null;
      this.timer = setInterval(() => {
        try {
          this.curTime = this.audioTimeTransform(this.audioDom.currentTime);
          this.curProgress = (this.audioDom.currentTime/this.audioDom.duration)*100;
          console.log(this.audioDom.currentTime, this.audioDom.duration);
        } catch (error) {
          console.log(error);
        }
        
      }, 1000);
    },
    audioTimeTransform(time) {
      //分钟
      let minute = time / 60;
      let minutes = parseInt(minute);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //秒
      let second = time % 60;
      let seconds = Math.round(second);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    },

    musicEnd() {
      this.musicList.forEach((item) => {
        item.playState = 0;
      });
      // 顺序播放
      // 随机播放
      // 单曲循环
      switch (this.curMode) {
        case 1:{
          // console.log(this.curMusic.id, 'id');
          if(this.curMusic.id != this.musicList.length){
            // console.log(this.musicList[Number(this.curMusic.id)], 'this.musicList[Number(this.curMusic.id)]');
            this.playCur(this.musicList[Number(this.curMusic.id)]);
          } else {
            this.playCur(this.musicList[0]);
          }
          break;
          }
        case 2:{
          let nextIndex = this.musicRandom(this.curMusic.id)
          this.playCur(this.musicList[nextIndex]);
          break;
        }
        case 3:{
          this.playCur(this.curMusic);
          break;
        }
        default:
          break;
      }
    },
    musicRandom(curId){
      let newId = Math.floor(Math.random() * this.musicList.length) + 1;
      if(curId == newId){
        this.musicRandom()
      } else {
        return Number(newId) - 1;
      }
    },
    modeChange(flag){
      this.curMode = flag;
      switch (flag) {
        case 1:
          this.$toast('顺序播放');
          break;
        case 2:
          this.$toast('随机播放');
          break;
        case 3:
          this.$toast('单曲循环');
          break;
        default:
          break;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.warp {
  color: #fff;
  background-color: #33318c;
  background-image: url(~@/assets/images/music/bg.jpg),
    url(~@/assets/images/music/footer.jpg);
  padding-top: 2.2rem;
  padding-bottom: 4rem;
  background-size: 100%;
  background-repeat: no-repeat, no-repeat;
  background-position: top, bottom;
  .banner {
    width: 9.32rem;
    height: 5.55rem;
    background-image: url(~@/assets/images/music/banner.png);
    background-size: 100% 100%;
    margin: 0 auto 1rem 1rem;
  }

  h2 {
    width: 3.53rem;
    height: 0.82rem;
    line-height: 0.82rem;
    text-align: center;
    background-image: linear-gradient(to right, #5d49f2, #e275ff);
    border-radius: 0.57rem;
    margin: 0 auto 0.66rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0.03px 0.07px 0px rgba(10, 9, 87, 0.3);
    position: relative;
    .text {
      width: 2.49rem;
      height: 0.4rem;
      background-image: url(~@/assets/images/music/h2_bg.png);
      background-size: 100% 100%;
    }
    // .orn{
    //   width: 0.76rem;
    //   height: 1.19rem;
    //   background-image: url(~@/assets/images/music/orn.png);
    //   background-size: 100% 100%;
    //   position: absolute;
    //   top: -0.15rem;
    //   left: -0.3rem;
    // }
  }
  .tools{
    padding: 0 1rem;
    text-align: right;
    margin-bottom: 0.3rem;
    img{
      padding: 0.05rem;
      width: 0.6rem;
      height: 0.6rem;
      margin-left: 0.2rem;
      opacity: 0.5;
    }
    .active{
      opacity: 1;
      border-radius: 0.1rem;
      background: rgba($color: #fff, $alpha: 0.1);
    }
  }
  .music-list {
    margin: 0 auto;
    width: 9.38rem;
    ul {
      li {
        margin-bottom: 0.5rem;
        border-radius: 0.3rem;
        padding: 0.3rem 0.5rem;
        // background-image: linear-gradient(to right, #372fd2 , #2a23b0);
        background-image: linear-gradient(to right, #5a37e5, #6a45ff);
        box-shadow: 0px 0.03px 0.07px 0px rgba(10, 9, 87, 0.3);
        position: relative;
        transition: all 0.5s;
        .info {
          h3 {
            font-size: 0.48rem;
            margin-bottom: 0.1rem;
          }
          p {
            font-size: 0.36rem;
            opacity: 0.6;
          }
        }
        .btn {
          position: absolute;
          right: 0.3rem;
          top: 0.35rem;
          width: 1.2rem;
          height: 1.2rem;
          img {
            width: 100%;
            height: 100%;
            border: none;
          }
        }
        &:last-child {
          margin-bottom: 0;
        }

        .progress {
          margin: 0.3rem 0 0.2rem;
        }
        .time {
          font-size: 0.36rem;
          .left {
            float: left;
          }
          .right {
            float: right;
          }
        }
      }
      .playing {
        // background-image: linear-gradient(to right, #7b6afc, #e278ff);
        background: linear-gradient(-45deg, #7b6afc, #b972fe, #e278ff, #b972fe, #7b6afc, #b972fe, #e278ff, #b972fe, #7b6afc);
        background-size: 1400% 1400%;
        // background-size: 1000% 400%;
        animation: gradient 20s linear 0s infinite;
        animation-direction:normal;
      }
    }
  }
  // .footer{
  //   height: 6rem;
  //   // background-image: url(~@/assets/images/music/footer.jpg);
  //   background-size: 100% 100%;
  // }
}
@keyframes gradient {
	0% {
		background-position: 0% 0%;
	}
	50% {
		background-position: 100% 0%;
	}
  100% {
		background-position: 0% 0%;
	}
}
</style>
