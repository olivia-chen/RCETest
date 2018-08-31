
# RECTest
This project is a working prototype of Reuters TV, basically borrowed the UI design of the Reuters TV, added and modified some features. The video control and playlist have been customized. The project is written with React js.

The link of the prototype is [https://rectest-8d46f.firebaseapp.com/](https://rectest-8d46f.firebaseapp.com/).

## Features Highlights (compare to the current Reuters TV)

1. Thumbnails on Customized Controls
	 * When hover on the scrubber bar, the user could see the thumbnail of each story with time sensitive.
	 * The image comes from the API `resource` `LANDSCAPE` and manually add `&width=200` to resize, considered the loading speed of images.

2. Full-page Pause Control
	* User could pause the video by clicking almost anywhere on the page.
	* The play will show in the middle of the page when paused and the current segment title shows as well.

3. Progress Bar in Playlist
	* There is a progress bar under the image (synced with the video) in playlist shows the progress of the current story between the previous one and the next one. 
	* The progress bar is also responsive to the page size.

4. Category Label
	* The display of the category of the story moves to the top of the title text to let the user know more clearly.

5. Accessibility Implementation
	* Tooltip text are shown on buttons when hover.
	* Keyboard(Space) has control on play/pause the video.

6. Ad Playing Handle 
	* When Ad starts playing, the actions on the scrubber bar are disabled and the playlist is hidden, but the user still could control the sound and the play/pause.

7. UI Advance
	* The playlist has the a blurred background as part of the video.

## How to Use

* The project is hosted on the address: [https://rectest-8d46f.firebaseapp.com/](https://rectest-8d46f.firebaseapp.com/).

* Or could be run in local by `npm` pre-installed: 
	* git clone this repository
	* In the file directory use commands `npm install` then
	`npm start`

## Technic Stack

* React.js
* Css
* HLS Library
* Algorithm
	* Use the currentTime and the duration to compute the current position on the scrubber
	* Use the previous index and the next index of the segment with `resource=STORY` to compute the progress of each story among the whole video in playlist.
	* Use `canvas` in Css to draw a video then blur and translate to show the blur video background in playlist.
	* The implementation assumes the `items` data response from API has been ordered by `startTime`.

## Credits
* This project borrowed most of Reuters TV design, implemented by using lots of original css code.
* The solution of the playlist blur background comes from online.

## TODO
1. Cross screen test(eg. IE, mobile devices).
2. Add more key-up actions.
3. Add icon/page to wait loading among interval stories.
4. Performance improve (eg. code refactor, algorithm improve)

## Screenshots
Here is two screenshots show the basic look:
![Playlist](/public/images/img1.png)
![Playlist](/public/images/img2.png)

