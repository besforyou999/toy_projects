export class BGM {
	constructor() {
        
		this.playlist = ['../resources/Bradinsky.mp3', '../resources/Troika.mp3', '../resources/Loginska.mp3', '../resources/Kalinka.mp3'];
        this.volume = 0.3;
		this.bgmIdx = 0;
		this.audio = new Audio(this.playlist[this.bgmIdx]);
		this.audio.autoplay = false;
	}

	PlayBGM() {
		this.audio.muted = true;
		this.audio.play();
		this.audio.muted = false;
	}

	playNextMusic() {
		this.audio.pause();
		this.bgmIdx = this.bgmIdx + 1 == BGM_LIST_LEN ? 0 : this.bgmIdx + 1;
		this.audio = new Audio(this.playlist[this.bgmIdx]);
		this.PlayBGM();
	}

	pauseMusic() {
		this.audio.pause();
	}

	pickNextMusicRandomly() {
		this.bgmIdx = Math.floor(Math.random() * BGM_LIST_LEN);
		this.audio = new Audio(this.playlist[this.bgmIdx]);
		this.PlayBGM();
	}
}