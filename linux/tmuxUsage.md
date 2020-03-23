## plugins
	tmux-prefix-highlight
	tmux-sensible: a lot pre configures
	tmux-pain-control

## tmux-sensible

	prefix+p n : previous, next windows;
	prefix+R : source the config file of tmux;

## tmux-pain-control

	prefix+h j k l : select pane
	prefix+shift+h j k l : resize the pane
	prefix+| - : split current pane
	prefix+\ _ : split current pane to form a full width pane
	
## tpm, a plugins manager
	prefix+I : install the plugins listed in the config files

## tmux shortcuts
	prefix+t : show the current time;
	prefix+x : shutdown the pane;
	prefix+q : show the pane code;

### session
	prefix+s : show all sessions;
	tmux new -s <sessions-name> : create a new session;
	tmux detach/attach : detach/attach the session from/to the terminal;

### windows
	prefix+c : new a windows;
	prefix+w : show the windows list;
### pane
	prefix+z : zoom out/zoom in the current pane;
	
