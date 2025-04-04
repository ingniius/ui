changeset.add:
	@pnpm changeset add
changeset.version:
	@pnpm changeset version
changeset.publish:
	@pnpm changeset publish

turbo.run:
	@pnpm turbo $(filter-out $@,$(MAKECMDGOALS)) $(MAKEFLAGS)
turbo.format:
	@pnpm prettier turbo/**/* --write --cache --cache-location .turbo/.prettiercache
turbo.pkg:
	@pnpm turbo gen package $(filter-out $@,$(MAKECMDGOALS)) $(MAKEFLAGS)
turbo.dry:
	@pnpm turbo clean && rm -rf .turbo node_modules

%:
	@:
