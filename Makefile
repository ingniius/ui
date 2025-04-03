turbo.run:
	@pnpm turbo $(filter-out $@,$(MAKECMDGOALS)) $(MAKEFLAGS)
turbo.dry:
	@pnpm turbo clean && rm -rf .turbo node_modules

%:
	@:
