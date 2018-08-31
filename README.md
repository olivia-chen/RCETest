
# RECTest
This working prototype of Reuters TV basically borrowed the UI of the Reuters TV, added and modified some features based on the current Reuters TV. The video controls has been customized. The project is written with React js.

## Features

1. Play the video stream both on Safari and Chrome by utilizing the API. The video will autoplay and muted following th Chrome policy. 

2. Video progress control:
	[] Click on the scrubber bar or dragging the nub on the scubber bar.
	[] Click the story in playlist.

3. Play/Pause Control:
	[] Click the play button on bottom left next to the scrubber bar.
	[] Click anywhere on the video window.
	[] Press space key on keyboard.

4. Show the current playing segment information:
	[] Move mouse to the bottom zone, the title of current playing segment shows on the up left corner.
	[] In playlist, the current playing segment is highlighted and has a progress bar downward.

5. Browse all the stories:
	[] Move to the right side bar to the playlist.
	[] Hover on the scubber bar, the thumbnail of the story shows upward depends on the playing time.

6. Show the progress the video playing:
	[] Move to show the scrubber bar, the yellow part growing by the playing time.
	[] In playlist, the progress bar under the current playing story shows the playing progress and left time to the next story.
	[] The timer on the bottom shows the played time and the total duration of the video.

7. Accessobility consideration includes subtitles display, tooltip text on buttons, and unmute notice after loading the video. 

9. When Ad starts playing, the actions on the scrubber bar are disabled and the playlist is hidden.

## How to use

The work is hosted on the address: <a>https://rectest-8d46f.firebaseapp.com/</a>.

Or could be run in local with commands in the file directory:
`npm install`
`npm start`


TODO:
1. Test playing on IE.
2. Be responsive for mobile devices. 
3. Add more keyup actions.