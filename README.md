
# RECTest
This project is a working prototype of Reuters TV, basically borrowed the UI design of the Reuters TV, added and modified some features. The video control has been customized. The project is written with React js.

screenshot

link

concern: close to current: 
icon, progress bar, pause window, label category, thumbnail, tooltip

## Features --- highlights

1. Video Play Preset
	* 
Play the video stream both on Safari and Chrome by utilizing the API. The video will auto-play and muted following th Chrome policy. 

2. Video Progress Control
	* Click on the scrubber bar or dragging the nub on the scrubber bar.
	* Click the story in playlist.

3. Play/Pause Control
	* Click the play button on bottom left next to the scrubber bar.
	* Click anywhere on the video window.
	* Press space key on keyboard.

4. Current Playing Segment Information Display
	* Move mouse to the bottom zone, the title of current playing segment shows on the up left corner.
	* In playlist, the current playing segment is highlighted and has a progress bar downward.

5. Browse All the Stories
	* Move to the right side bar to the playlist.
	* Hover on the scrubber bar, the thumbnail of the story shows upward depends on the playing time.

6. Video Playing Progress Display
	* Move to show the scrubber bar, the yellow part growing by the playing time.
	* In playlist, the progress bar under the current playing story shows the playing progress and left time to the next story.
	* The timer on the bottom shows the played time and the total duration of the video.

7. Accessibility Application
	* Subtitles display control
	* Tooltip text on buttons
	* Notice of un-mute method after loading the video
	* Keyboard(Space) Control

9. Ad Playing Handle 
When Ad starts playing, the actions on the scrubber bar are disabled and the playlist is hidden.

10. UI Advance


## How to Use

* The project is hosted on the address: [https://rectest-8d46f.firebaseapp.com/](https://rectest-8d46f.firebaseapp.com/).

* setup: Or could be run in local with commands in the file directory:
`npm install`
`npm start`

* git clone

## Credits
code reference

## TODO:
1. Test on IE.
2. Be responsive for mobile devices. 
3. Add more key-up actions.
4. Add loading icon/page when loading and between stories

## Technology
react 
css
canvas

## 