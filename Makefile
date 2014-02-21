OUT := public/index.js

$(OUT): lib
	./node_modules/.bin/browserify lib/index.js > $@

clean:
	rm $(OUT)
