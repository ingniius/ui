changeset.add:
	@pnpm changeset add
changeset.version:
	@pnpm changeset version
changeset.publish:
	@pnpm changeset publish

turbo.run:
	@pnpm turbo $(filter-out $@,$(MAKECMDGOALS)) $(MAKEFLAGS)
turbo.dry:
	@pnpm turbo clean && rm -rf .turbo node_modules

%:
	@:
